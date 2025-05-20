import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import avatar from "../../images/avatar.png";

function SideBar({ handleEditProfile, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          className="sidebar__user-avatar"
          src={currentUser.avatar || avatar}
          alt="User Avatar"
        />
        <p className="sidebar__user-name">
          {currentUser.name} {currentUser.avatar}
        </p>
      </div>
      <ul className="sidebar__nav">
        <li className="sidebar__nav-item">
          <button className="sidebar__nav-button" onClick={handleEditProfile}>
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
