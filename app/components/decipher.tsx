export default function Decipher({ prompt }: { prompt?: string }) {
    if (!prompt) {
        return null;
    }
    return (
        <div>
            <h2>Prompt</h2>
            <p>
                {prompt}
            </p>
        </div>
    )
}