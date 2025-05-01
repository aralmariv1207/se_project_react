import "./SideBar.css";
import avatar from "../../images/avatar.png";

function SideBar({ onEditProfile, handleSignOut }) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
      <button className="header__button" onClick={onEditProfile}>
        Edit Profile
      </button>
      <button className="header__button" onClick={handleSignOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
