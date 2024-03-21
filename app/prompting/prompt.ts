import { PromptEngine } from "prompt-engine";

export default function buildPrompt(userInput: string) {
    const description = `Mikä lintulaji ja määrä oli havaittu? Käyttäjän syöte on teksti kuten 'kolme töyhtökiurua' ja vastaus on JSON-objekti jossa on laji ja määrä
kuten '{ "laji": "töyhtökiuru", "määrä": 3 }'. Vastauksen täytyy olla JSON-muodossa. Käytä lajin nimenä yksikkömuotoa ja määränä kokonaislukua.
Jos lintulajia ja määrää ei voida määrittää, vastauksen täytyy olla tyhjä JSON-objekti '{}'.

Jos lintulaji on kirjoitettu väärin, korjaa se oikeaan muotoon.

Esimerkkejä:`
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
        {
            input: "Kiitos kun katsoit!",
            response: "{}"
        },
        {
            input: "Iso koskelo",
            response: `{ "laji": "isokoskelo", "määrä": 1 }`
        },
        {
            input: "Kaksi käpytikkoa",
            response: `{ "laji": "käpytikka", "määrä": 2 }`
        },
        {
            input: "Viiru pöllä",
            response: `{ "laji": "viirupöllö", "määrä": 1 }`
        },
    ]
    const promptEngine = new PromptEngine(description, examples, undefined, {
        descriptionPrefix: ">>",
        descriptionPostfix: "",
        inputPrefix: "Syöte:",
        outputPrefix: "",
        inputPostfix: "",
        outputPostfix: "",
        newlineOperator: "\n"
    });

    return promptEngine.buildPrompt(userInput)
}
