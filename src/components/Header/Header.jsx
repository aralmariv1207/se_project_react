import "./Header.css";
import logo from "../../images/logo.svg";
import avatar from "../../images/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "contexts/CurrentUserContext";

function Header({
  weatherData,
  onLoginClick,
  onRegisterClick,
  onEditProfile,
  handleSignOut,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
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
          <div className="header__avatar">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt="avatar" />
            ) : (
              currentUser.name.charAt(0).toUpperCase()
            )}
          </div>
          <span>Welcome, {currentUser.name}!</span>
          <button className="header__button" onClick={onEditProfile}>
            Edit Profile
          </button>
          <button className="header__button" onClick={handleSignOut}>
            Log out
          </button>
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
