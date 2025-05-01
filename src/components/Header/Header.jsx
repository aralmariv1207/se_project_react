import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ weatherData, onLoginClick, onRegisterClick }) {
  const navigate = useNavigate();
  const goToProfile = () => {
    navigate("/profile");
  };
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header" onClick={goToProfile}>
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
          </Link>
          <span>Welcome, {currentUser.name}!</span>
        </div>
      ) : (
        <div className="header__auth">
          <button className="header__button" onClick={onLoginClick}>
            Log in
          </button>
          <button className="header__button" onClick={onRegisterClick}>
            Sign up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
