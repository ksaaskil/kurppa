export default function buildPrompt(userInput: string) {
  const description = `Tehtävä on määrittää lintulaji ja määrä käyttäjän
luonnollisella kielellä antamasta syötteestä. Käyttäjän syöte on teksti kuten
'kolme töyhtökiurua' ja vastaus on JSON-objekti jossa on laji ja määrä
kuten '{ "laji": "töyhtökiuru", "määrä": 3 }'.

Vastauksen täytyy olla JSON-muodossa.

Käytä lajin nimenä yksikkömuotoa ja määränä kokonaislukua.

Jos lintulajia ja määrää ei voida määrittää, vastauksen täytyy olla tyhjä JSON-objekti '{}'.

Jos lintulaji on kirjoitettu väärin, korjaa se oikeaan muotoon. Korjauksen pitää olla pieni, enintään yksi kirjain.
`;
  const examples = [
    {
      input: "Kolme varista",
      response: '{ "laji": "varis", "määrä": 3 }',
    },
    {
      input: "Kaksi harakkaa",
      response: '{ "laji": "harakka", "määrä": 2 }',
    },
    {
      input: "Taivaan vuohi",
      response: '{ "laji": "taivaanvuohi", "määrä": 1 }',
    },
    {
      input: "Varpunen",
      response: '{ "laji": "varpunen", "määrä": 1 }',
    },
    {
      input: "Kiitos kun katsoit!",
      response: "{}",
    },
    {
      input: "Iso koskelo",
      response: `{ "laji": "isokoskelo", "määrä": 1 }`,
    },
    {
      input: "Kaksi käpytikkoa",
      response: `{ "laji": "käpytikka", "määrä": 2 }`,
    },
    {
      input: "15 rautiaista",
      response: `{ "laji": "rautiainen", "määrä": 15 }`,
    },
    {
      input: "Viiru pöllä",
      response: `{ "laji": "viirupöllö", "määrä": 1 }`,
    },
  ];

  const systemPrompt = `${description}
Esimerkkejä:

${examples
  .map((example) => `>>> ${example.input}\n${example.response}`)
  .join("\n\n")}`;

  return { system: systemPrompt, user: `>>> ${userInput}` };
}
