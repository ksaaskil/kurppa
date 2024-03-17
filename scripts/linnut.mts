#!/usr/bin/env node --loader ts-node/esm
/* Parse linnut.hmtl extracted from Luontoportti to build a list of bird species */

import * as fs from "fs";
import * as jsdom from "jsdom";

const { JSDOM } = jsdom;

interface Species {
  scientificName: string;
  href: string;
  commonName: string;
}

function main() {
  const textContent = fs.readFileSync("linnut.html");
  const dom = new JSDOM(textContent);
  const speciesNodeList = dom.window.document.querySelectorAll("a.speciescard");
  const speciesList: Species[] = [];
  speciesNodeList.forEach((n) => {
    const scientificName = n
      .querySelector(".scientificname")
      ?.textContent?.trim();
    const href = n.getAttribute("href");
    const commonName = n.querySelector(".commonname")?.textContent;
    console.log(scientificName, href, commonName);
    if (!(scientificName && href && commonName)) {
      throw new Error(`Invalid result`);
    }
    const species = { scientificName, href, commonName };
    speciesList.push(species);
  });

  const outputFile = "linnut.json";
  console.log(`Writing ${speciesList.length} species to file: ${outputFile}`);
  fs.writeFileSync(
    outputFile,
    JSON.stringify({ species: speciesList }, undefined, 2),
  );
}

main();
