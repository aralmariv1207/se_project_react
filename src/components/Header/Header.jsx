import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";


function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch/>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <Link to="/profile" className="header__link">
      <div className="header__user-container">
        <Link to="/">
         <img src={avatar} alt="Terrence Tegegne" className="header__avatar"/>
        <Link/>
        <p className="header__username">Terrence Tegegne</p>
      </div>
      </Link>
      </div>
    </header>
  );
}

export default Header;
