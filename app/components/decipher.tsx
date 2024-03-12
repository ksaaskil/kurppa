import { Result } from "../hooks/useDecipher";

export default function Decipher({ prompt, result, error, loading }: { prompt?: string, result?: Result, error?: Error, loading: boolean }) {
    return (
        <div>
            {/* {prompt && <p>
                Prompt: {prompt}
            </p>} */}
            {result && <p>
                Result:
                <ol>
                    <li>Laji: {result?.species}</li>
                    <li>Määrä: {result?.amount}</li>
                </ol>
            </p>}
            {error && <p>
                Error: {error?.message}
            </p>}
        </div>
    )
}