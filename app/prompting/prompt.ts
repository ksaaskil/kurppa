import { readFileSync } from "fs";
import { PromptEngine } from "prompt-engine";

const promptEngine = new PromptEngine();

const yamlConfig = readFileSync("./prompt.yaml", "utf8");
promptEngine.loadYAML(yamlConfig);

export default function buildPrompt(userInput: string) {
    return promptEngine.buildPrompt(userInput)
}