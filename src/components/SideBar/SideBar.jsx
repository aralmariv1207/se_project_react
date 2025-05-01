import "./SideBar.css";
import avatar from "../../images/avatar.png";

function SideBar({ onEditProfile, handleSignOut }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          className="sidebar__user-avatar"
          src={avatar}
          alt="Default Avatar"
        />
        <p className="sidebar__user-name">Terrence Tegegne</p>
      </div>
      <ul className="sidebar__nav">
        <li className="sidebar__nav-item">
          <button className="sidebar__nav-button" onClick={onEditProfile}>
            Edit Profile
          </button>
        </li>
        <li className="sidebar__nav-item">
          <button className="sidebar__nav-button" onClick={handleSignOut}>
            Log out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
