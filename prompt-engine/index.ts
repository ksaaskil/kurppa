import { PromptEngine } from "prompt-engine";
import { readFileSync } from "fs";

const promptEngine = new PromptEngine();

const yamlConfig = readFileSync("./prompt.yaml", "utf8");
promptEngine.loadYAML(yamlConfig);

console.log(promptEngine.buildPrompt("Neljä kiurua", true))
