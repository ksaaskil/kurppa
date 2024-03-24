export default function ThemeSelector({
  themes,
  theme,
  setTheme,
}: {
  themes: string[];
  theme: string;
  setTheme: (s: string) => void;
}) {
  <label className="form-control w-full max-w-xs">
    <div className="label">
      <span className="label-text">Valitse väriteema</span>
    </div>
    <select className="select select-primary select-bordered">
      {themes.map((theme_) => (
        <option
          key={theme_}
          selected={theme_ === theme}
          onClick={() => setTheme(theme_)}
        >
          {theme_}
        </option>
      ))}
    </select>
  </label>;
}
