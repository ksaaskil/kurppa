import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

import buildPrompt from "@/app/prompting/prompt";
import {
  ApiError,
  DecipherApiResponse,
  ListedSpecies,
  readSpeciesList,
} from "@/app/utils/shared";

const openai = new OpenAI();
const DECIPHER_TIMEOUT_SECONDS = 5;

const MODEL = "gpt-3.5-turbo-0125";
// const MODEL = "gpt-3.5-turbo";

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

const MAX_TEXT_LENGTH = 100;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DecipherApiResponse>,
) {
  const text = req.body.text;
  console.log(`Deciphering text: ${text}`);

  if (text.length > MAX_TEXT_LENGTH) {
    res.status(400).json({
      errors: [
        {
          title: ApiError.INPUT_TOO_LONG,
          detail: `Received ${text.length} characters, expected less than ${MAX_TEXT_LENGTH} characters`,
        },
      ],
    });
  }

  const { system: systemPrompt, user: userPrompt } = buildPrompt(text);

  // Only used for logging
  const prompt = `
${systemPrompt}

${userPrompt}
`;

  /* console.debug(`
Sending prompt to OpenAI:

${prompt}
`); */

  let chatResult: string | null;
  try {
    const completion = await openai.chat.completions.create(
      {
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        model: MODEL,
      },
      { timeout: DECIPHER_TIMEOUT_SECONDS * 1000 },
    );
    console.log(`Got response: ${JSON.stringify(completion)}`);
    chatResult = completion.choices[0].message.content;
  } catch (error: any) {
    console.error("Error deciphering text", error);
    return res.status(500).json({
      errors: [{ title: ApiError.ERROR_CALLING_GPT, detail: error.message }],
      prompt,
    });
  }

  if (!chatResult) {
    return res.status(500).json({
      errors: [{ title: ApiError.EMPTY_RESPONSE_FROM_GPT }],
      prompt,
    });
  }

  let rawResult: RawResult;
  try {
    rawResult = JSON.parse(chatResult);
  } catch (error: any) {
    return res.status(500).json({
      errors: [
        { title: ApiError.INVALID_RESPONSE_FROM_GPT, detail: chatResult },
      ],
      prompt,
    });
  }

  const validationResult = await validateResult(rawResult);

  const validationError = validationResult.error;
  if (validationError) {
    return res.status(500).json({
      errors: [{ title: validationError.toString(), detail: rawResult.laji }],
      prompt,
    });
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
