import buildPrompt from "@/app/prompting/prompt";

function useDecipher({ userInput }: { userInput: string }) {
    const prompt = buildPrompt(userInput);
    return { prompt }
}

export { useDecipher }
