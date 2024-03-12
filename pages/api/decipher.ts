import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import buildPrompt from "@/app/prompting/prompt";

const openai = new OpenAI();

interface ResponseData {
    species?: string;
    amount?: number;
    error?: string;
    prompt: string;
}

// const MODEL = "gpt-3.5-turbo-0125";
const MODEL = "gpt-3.5-turbo";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    const text = req.body.text;
    console.log(`Deciphering text: ${text}`);

    const prompt = buildPrompt(text)

    console.log(`
Sending prompt to OpenAI:

${prompt}
`);
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { "role": "user", "content": prompt }
            ],
            model: MODEL,
            // response_format: { type: "json_object" },
        });
        console.log(`Got response: ${JSON.stringify(completion)}`);
        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error("No content in response");
        }
        const result = JSON.parse(content)
        res.status(200).json({ species: result.laji, amount: result.määrä, prompt });
    } catch (error: any) {
        console.error("Error deciphering text", error);
        return res.status(500).json({ error: `Error deciphering: ${error.message}`, prompt });
    }
}
