import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";
import { useContext } from "react";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <div className="toggle-switch">
      <label htmlFor="toggle" className="toggle-switch__label">
        <input
          onChange={handleToggleSwitchChange}
          type="checkbox"
          id="toggle"
          className="toggle-switch__checkbox"
        />
        <span className="toggle-switch__circle"></span>
        <span
          className={`toggle-switch__text toggle-switch__text_F ${
            currentTemperatureUnit === "F"
              ? "toggle-switch__text_color_white"
              : ""
          }`}
        >
          F
        </span>
        <span
          className={`toggle-switch__text toggle-switch__text_C ${
            currentTemperatureUnit === "C"
              ? "toggle-switch__text_color_white"
              : ""
          }`}
        >
          C
        </span>
      </label>
    </div>
  );
}
