import { promises as fs } from "fs";
import { RESOURCES_PATH } from "./config";

export interface ListedSpecies {
  scientificName: string;
  finnishName: string;
  link: string;
}

export async function readSpeciesList(): Promise<ListedSpecies[]> {
  const speciesListFile = `${process.cwd()}${RESOURCES_PATH}/linnut.json`;
  console.log(`Reading species list from file: ${speciesListFile}`);
  const content = await fs.readFile(speciesListFile, "utf8");
  const json = JSON.parse(content);
  return json.species;
}
