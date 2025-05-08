import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ weatherData, onLoginClick, onRegisterClick, onAddNewItem }) {
  const { currentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {currentUser ? (
        <div className="header__user-info">
          <Link to="/profile" className="header__button">
            <div className="header__avatar">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  className="header__avatar-img"
                  alt="avatar"
                />
              ) : (
                currentUser.name.charAt(0).toUpperCase()
              )}
            </div>
            {currentUser.name}
          </Link>
        </div>
      ) : null}
      {currentUser ? (
        <div className="header__actions">
          <Link to="/profile" className="header__button">
            Profile
          </Link>
          <button className="header__button" onClick={onAddNewItem}>
            + Add clothes
          </button>
        </div>
      ) : (
        <div className="header__auth-buttons">
          <button onClick={onLoginClick}>Log in</button>
          <button onClick={onRegisterClick}>Sign up</button>
        </div>
      )}
    </header>
  );
}

export default Header;
