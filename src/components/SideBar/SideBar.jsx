import "./SideBar.css";
import avatar from "../../images/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default Avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default SideBar;
