import { PromptEngine } from "prompt-engine";

export default function buildPrompt(userInput: string) {
    const description = "Mikä lintulaji ja määrä oli havaittu? Käyttäjän syöte on teksti kuten 'kolme töyhtökiurua' ja vastaus on JSON-objekti jossa on laji ja määrä."
    const examples = [
        {
            input: "Kolme varista",
            response: "{ \"laji\": \"varis\", \"määrä\": 3 }"
        },
        {
            input: "Kaksi harakkaa",
            response: "{ \"laji\": \"harakka\", \"määrä\": 2 }"
        },
        {
            input: "Varpunen",
            response: "{ \"laji\": \"varpunen\", \"määrä\": 1 }"
        },
    ]
    const promptEngine = new PromptEngine(description, examples);

    return promptEngine.buildPrompt(userInput)
}