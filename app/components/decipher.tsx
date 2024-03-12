import { Result } from "../hooks/useDecipher";

export default function Decipher({ prompt, result, error, loading }: { prompt?: string, result?: Result, error?: Error, loading: boolean }) {
    return (
        <div>
            <h2>Prompt</h2>
            <p>
                Prompt: {prompt}
            </p>
            <p>
                Result: {result?.species} {result?.amount}
            </p>
            <p>
                Error: {error?.message}
            </p>
        </div>
    )
}