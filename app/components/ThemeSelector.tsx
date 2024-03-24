export default function ThemeSelector({
  themes,
  theme,
  setTheme,
}: {
  themes: string[];
  theme?: string;
  setTheme: (s: string) => void;
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Valitse väriteema</span>
      </div>
      <select
        className="select select-primary select-bordered"
        value={theme}
        onChange={(ev) => setTheme(ev.target.value)}
      >
        {themes.map((theme_) => (
          <option key={theme_} value={theme_}>
            {theme_}
          </option>
        ))}
      </select>
    </label>
  );
}
