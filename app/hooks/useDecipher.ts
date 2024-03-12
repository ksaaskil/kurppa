import { useEffect, useState } from "react";

export interface Result {
    species: string;
    amount: number;
}

function useDecipher({ userInput }: { userInput: String | null }) {
    const [result, setResult] = useState(undefined as Result | undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined as Error | undefined);

    useEffect(() => {
        async function decipher() {
            setError(undefined);
            if (!userInput) {
                setResult(undefined);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch("/api/decipher", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: userInput,
                    }),
                }).then((res) => res.json());
                const { species, amount } = response;
                console.log(`Got response: ${JSON.stringify(response)}`);
                setResult({ species, amount });
            } catch (error: any) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        decipher();
    }, [userInput]);

    return { result, loading, error };
}

export { useDecipher }
