import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

import buildPrompt from "@/app/prompting/prompt";
import { ListedSpecies, readSpeciesList } from "@/app/utils/shared";

const openai = new OpenAI();
const DECIPHER_TIMEOUT_SECONDS = 5;

interface ResponseData {
  species?: ListedSpecies;
  amount?: number;
  error?: string;
  prompt: string;
}

// const MODEL = "gpt-3.5-turbo-0125";
const MODEL = "gpt-3.5-turbo";

interface Result {
  species: ListedSpecies;
  amount: number;
}

interface RawResult {
  laji?: string;
  määrä?: string;
}

async function validateResult(result: RawResult): Promise<Result> {
  const speciesFinnishInput = result.laji;

  if (!speciesFinnishInput) {
    throw new Error(`No species found`);
  }

  const amount = result.määrä;

  if (typeof amount !== "number") {
    throw new Error(`Invalid amount: ${amount}`);
  }

  const speciesList: ListedSpecies[] = await readSpeciesList();

  const matchedSpecies = speciesList.find(
    (listedSpecies) =>
      listedSpecies.finnishName.toLowerCase() ===
      speciesFinnishInput.toLowerCase(),
  );

  if (!matchedSpecies) {
    throw new Error(`No matching species found for: ${speciesFinnishInput}`);
  }

  return {
    species: matchedSpecies,
    amount,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
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
      .json({ error: `Error deciphering: ${error.message}`, prompt });
  }

  if (!chatResult) {
    return res
      .status(500)
      .json({ error: `Error deciphering: empty response`, prompt });
  }

  let result: RawResult;
  try {
    result = JSON.parse(chatResult);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: `Error deciphering: invalid response`, prompt });
  }

  let validatedResult: Result;
  try {
    validatedResult = await validateResult(result);
  } catch (error: any) {
    console.error("Error validating result", error);
    return res
      .status(500)
      .json({ error: `Error deciphering: ${error.message}`, prompt });
  }

  res.status(200).json({
    species: validatedResult.species,
    amount: validatedResult.amount,
    prompt,
  });
}
