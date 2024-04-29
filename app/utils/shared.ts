import { promises as fs } from "fs";
import { RESOURCES_PATH } from "./config";
import { WorldLocation } from "../hooks/useLocation";

export interface ListedSpecies {
  scientificName: string;
  finnishName: string;
  link: string;
}

export async function findListedSpecies(
  finnishName: string,
): Promise<ListedSpecies | undefined> {
  const speciesMap = await readSpeciesMap();
  return speciesMap[normalizeSpecies(finnishName)];
}

function normalizeSpecies(species: string): string {
  return species.toLowerCase().trim();
}

let speciesCache = {} as Record<string, ListedSpecies>;

export async function readSpeciesMap(): Promise<Record<string, ListedSpecies>> {
  if (Object.keys(speciesCache).length > 0) {
    return speciesCache;
  }
  const speciesListFile = `${process.cwd()}${RESOURCES_PATH}/linnut.json`;
  const content = await fs.readFile(speciesListFile, "utf8");
  const json = JSON.parse(content);
  speciesCache = (json.species as any[]).reduce(
    (acc: Record<string, ListedSpecies>, species: ListedSpecies) => {
      return { ...acc, [normalizeSpecies(species.finnishName)]: species };
    },
    {} as Record<string, ListedSpecies>,
  );
  return speciesCache;
}

export interface DecipherResult {
  species: ListedSpecies;
  amount: number;
  processed: boolean;
}

export interface Observation {
  id?: string;
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
