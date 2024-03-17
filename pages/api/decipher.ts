import { promises as fs } from "fs";

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

import buildPrompt from "@/app/prompting/prompt";
import { ListedSpecies } from "@/app/utils/shared";

const openai = new OpenAI();

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
  const content = await fs.readFile(process.cwd() + "/app/linnut.json", "utf8");

  const speciesFinnishInput = result.laji;

  if (!speciesFinnishInput) {
    throw new Error(`No species found`);
  }

  const amount = result.määrä;

  if (typeof amount !== "number") {
    throw new Error(`Invalid amount: ${amount}`);
  }

  const speciesList: ListedSpecies[] = JSON.parse(content).species;

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
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: MODEL,
      // response_format: { type: "json_object" },
    });
    console.log(`Got response: ${JSON.stringify(completion)}`);
    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No content in response");
    }
    const result: RawResult = JSON.parse(content);
    const validatedResult = await validateResult(result);
    res.status(200).json({
      species: validatedResult.species,
      amount: validatedResult.amount,
      prompt,
    });
  } catch (error: any) {
    console.error("Error deciphering text", error);
    return res
      .status(500)
      .json({ error: `Error deciphering: ${error.message}`, prompt });
  }
}
