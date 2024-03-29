import { promises as fs } from "fs";
import { RESOURCES_PATH } from "./config";
import { WorldLocation } from "../hooks/useLocation";

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

export interface DecipherResult {
  species: ListedSpecies;
  amount: number;
}

export interface Observation {
  species: ListedSpecies;
  amount: number;
  date: Date;
  location?: WorldLocation;
}

export enum ApiError {
  UNKNOWN_ERROR = "Unknown error",
  UKNOWN_SPECIES = "Unknown species",
  NO_SPECIES_FOUND = "No species found",
  INVALID_NUMBER = "Invalid number",
  ERROR_CALLING_GPT = "Error calling GPT",
  EMPTY_RESPONSE_FROM_GPT = "Empty response from GPT",
  INVALID_RESPONSE_FROM_GPT = "Invalid response from GPT",
  INPUT_TOO_LONG = "Input too long",
}

export interface ApiErrorResponse {
  title: string;
  detail?: string;
}

export interface DecipherApiResponse {
  species?: ListedSpecies;
  amount?: number;
  prompt?: string;
  errors?: ApiErrorResponse[];
}
