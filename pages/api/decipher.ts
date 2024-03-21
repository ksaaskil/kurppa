import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

import buildPrompt from "@/app/prompting/prompt";
import { ApiError, ApiErrorResponse, DecipherApiResponse, ListedSpecies, readSpeciesList } from "@/app/utils/shared";

const openai = new OpenAI();
const DECIPHER_TIMEOUT_SECONDS = 5;

// const MODEL = "gpt-3.5-turbo-0125";
const MODEL = "gpt-3.5-turbo";

interface Result {
  species: ListedSpecies;
  amount: number;
}

interface ValidateResult {
  result?: Result;
  error?: ApiError;
}

interface RawResult {
  laji?: string;
  määrä?: string;
}

async function validateResult(result: RawResult): Promise<ValidateResult> {
  const speciesFinnishInput = result.laji;

  if (!speciesFinnishInput) {
    return { error: ApiError.NO_SPECIES_FOUND };
  }

  const amount = result.määrä;

  if (typeof amount !== "number") {
    return { error: ApiError.INVALID_NUMBER };
  }

  const speciesList: ListedSpecies[] = await readSpeciesList();

  const matchedSpecies = speciesList.find(
    (listedSpecies) =>
      listedSpecies.finnishName.toLowerCase() ===
      speciesFinnishInput.toLowerCase(),
  );

  if (!matchedSpecies) {
    return { error: ApiError.UKNOWN_SPECIES };
  }

  return {
    result: {
      species: matchedSpecies,
      amount,
    },
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DecipherApiResponse>,
) {
  const text = req.body.text;
  console.log(`Deciphering text: ${text}`);

  const prompt = buildPrompt(text);

  console.log(`
Sending prompt to OpenAI:

${prompt}
`);
  let chatResult: string | null;
  try {
    const completion = await openai.chat.completions.create(
      {
        messages: [{ role: "user", content: prompt }],
        model: MODEL,
      },
      { timeout: DECIPHER_TIMEOUT_SECONDS * 1000 },
    );
    console.log(`Got response: ${JSON.stringify(completion)}`);
    chatResult = completion.choices[0].message.content;
  } catch (error: any) {
    console.error("Error deciphering text", error);
    return res
      .status(500)
      .json({
        errors: [
          { title: `Error deciphering: Request to ChatGPT failed with: ${error.message}` }
        ], prompt
      });
  }

  if (!chatResult) {
    return res
      .status(500)
      .json({
        errors: [
          { title: `Error deciphering: empty response from ChatGPT` }
        ], prompt
      })
  }

  let rawResult: RawResult;
  try {
    rawResult = JSON.parse(chatResult);
  } catch (error: any) {
    return res
      .status(500)
      .json({
        errors: [
          { title: `Error deciphering: invalid response from ChatGPT` }
        ], prompt
      });
  };

  const validationResult = await validateResult(rawResult);

  const validationError = validationResult.error;
  if (validationError) {
    return res.status(500).json({ errors: [{ title: validationError.toString(), detail: rawResult.laji }], prompt });
  }

  const finalResult = validationResult.result;

  if (!finalResult) {
    throw new Error(`Did not expect empty result`);
  }

  res.status(200).json({
    species: finalResult.species,
    amount: finalResult.amount,
    prompt,
  });
}
