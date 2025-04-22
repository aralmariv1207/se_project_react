import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import { ConfirmationDeleteModal } from "../ConfirmationDeleteModal/ConfirmationDeleteModal";
import {
  getItems,
  deleteItem,
  addItem,
  login,
  register,
  checkToken,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

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
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const isLoggedIn = Boolean(currentUser);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather, token })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardDelete = () => {
    setIsLoading(true);
    const token = localStorage.getItem("jwt");
    deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item._id !== cardToDelete._id)
        );
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openConfirmationDeleteModal = (data) => {
    setActiveModal("delete-confirmation");
    setCardToDelete(data);
  };

  const handleRegister = ({ email, password, name }) => {
    register({ email, password, name })
      .then((res) => {
        if (res) {
          return login({ email, password });
        }
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res);
          setIsRegisterModalOpen(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message || "An error occurred during registration");
      });
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setCurrentUser(res);
          setIsLoginModalOpen(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message || "An error occurred during login");
      });
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      // Make API call to update profile
      const updatedUser = await updateProfile(updatedData);

      // Update the current user state with new data
      setCurrentUser(updatedUser);

      // Close the modal
      setIsEditProfileModalOpen(false);

      // Clear any error messages
      setErrorMessage("");
    } catch (error) {
      // Handle any errors
      setErrorMessage(error.message);
    }
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.error(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item))
            );
          })
          .catch((err) => console.error(err));
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("jwt");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    const handleOverlayClickClose = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("click", handleOverlayClickClose);

    return () => {
      document.removeEventListener("click", handleOverlayClickClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              onLoginClick={() => setIsLoginModalOpen(true)}
              setErrorMessage={setErrorMessage}
              onRegisterClick={() => setIsRegisterModalOpen(true)}
              onEditProfile={() => setIsEditProfileModalOpen(true)}
              handleSignOut={handleSignOut}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onSelectCard={handleCardClick}
                    onAddNewItem={handleAddClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  currentUser ? (
                    <Profile
                      clothingItems={clothingItems}
                      onSelectCard={handleCardClick}
                      onAddNewItem={handleAddClick}
                      onCardLike={handleCardLike}
                    />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            openDeleteModal={openConfirmationDeleteModal}
          />
          <ConfirmationDeleteModal
            onClose={closeActiveModal}
            handleDeleteConfirm={handleCardDelete}
            isOpen={activeModal === "delete-confirmation"}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={() => {
              setIsRegisterModalOpen(false);
              setErrorMessage("");
            }}
            onSubmit={handleRegister}
            errorMessage={errorMessage}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => {
              setIsLoginModalOpen(false);
              setErrorMessage("");
            }}
            onSubmit={handleLogin}
            errorMessage={errorMessage}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            onSubmit={handleUpdateProfile}
            errorMessage={errorMessage}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
