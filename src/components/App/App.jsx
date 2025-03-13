import { useState, useEffect } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {defaultClothingItems} from "../../utils/constants";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { getItems } from "../../utils/api";
import { ConfirmationDeleteModal } from "../ConfirmationDeleteModal/ConfirmationDeleteModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentGarments, setCurrentGarments] = useState([]);
  
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F"? "C":"F");
    }
   

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = () => {
    const newId = Math.max(...clothingItems.map((item)=> item._id)) + 1; 
    setClothingItems((prevItems) => [{ name, link: imageUrl, weather }, ...prevItems]);
    closeActiveModal();
  };

  const handleCardDelete = (cardToDelete) => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item._id !== cardToDelete._id),
        );
        setCardToDelete(null);
        closeAllModals();
      })
      .catch(console.error);
  };

const CloseAllModals = () => {
setActiveModal("");
}

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  const handleClothing = (data) => {
    setCurrentGarments(data);
  }

  const openDeleteModal = (data) => {
    setActiveModal("delete");
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return ( 
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Routes>
          <Route path="/" element={<Main weatherData={weatherData} handleCardClick={handleCardClick} clothingItems={clothingItems}/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
        
        
        <Footer />
      </div>
      <AddItemModal 
      isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
        onAddItemModalSubmit={handleAddItemModalSubmit}
        />
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
        openDeleteModal={openDeleteModal}
      />
      <ConfirmationDeleteModal onClose={closeActiveModal} handleDeleteConfirm={handleCardDelete} isOpen={activeModal === "delete-confirmation"} />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
