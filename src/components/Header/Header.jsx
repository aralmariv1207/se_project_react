import "./Header.css";
import logo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ weatherData, onLoginClick, onRegisterClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const handleAddClothes = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clothingData = {
      name: e.target.name.value,
      description: e.target.description.value,
      // Add other fields as necessary
    };

    try {
      const token = localStorage.getItem("jwt"); // Assuming token is stored in local storage
      const response = await fetch("http://your-backend-url/api/clothes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clothingData),
      });

      if (response.ok) {
        const newClothes = await response.json();
        console.log("Clothes added:", newClothes);
        closeModal();
        // Optionally, update state to show new item
      } else {
        console.error("Failed to add clothes");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        <div className="header__actions">
          <Link to="/profile" className="header__button">
            Profile
          </Link>
          <button className="header__button" onClick={handleAddClothes}>
            Add Clothes
          </button>
          {isModalOpen && (
            <div className="modal">
              <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Clothing Name" required />
                <input type="text" placeholder="Description" required />
                <button type="submit">Submit</button>
                <button type="button" onClick={closeModal}>
                  Close
                </button>
              </form>
            </div>
          )}
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
