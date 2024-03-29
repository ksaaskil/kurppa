import { ChangeEvent, useContext } from "react";
import { LocationContext } from "./Providers";

export default function LocationSwitch() {
  const { enabled, start, stop } = useContext(LocationContext);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    if (value) {
      start();
    } else {
      stop();
    }
  }

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">Käytä sijaintia</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={enabled}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
