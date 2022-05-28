// CSS
import "./SettingsPage.css";

// icons
import sun from "../../svgs/sun.svg";
import moon from "../../svgs/moon.svg";

// Redux
import { useSelector } from "react-redux";

// Handle Click Functions
import { ChangeMode } from "./functions/changeMode";

export const SettingsPage = () => {
  const mode = useSelector((state) =>
    state.user.mode === "light" ? "dark" : "light"
  );

  return (
    <div className="SettingsPage pageAnimation">
      <h4>Settings</h4>
      <figure>
        <figcaption>Mode</figcaption>
        <button
          className={`mode ${mode}`}
          onClick={() => ChangeMode({ mode: mode })}
        >
          <img src={mode === "dark" ? moon : sun} alt="mode" className="mode" />
        </button>
      </figure>
    </div>
  );
};
