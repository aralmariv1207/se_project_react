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
import { Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

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
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    setActiveModal(null);
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleAddItemModalSubmit = (item) => {
    const makeRequest = () => {
      const token = localStorage.getItem("jwt");
      return addItem({ ...item, token }).then((item) => {
        setClothingItems([item, ...clothingItems]);
      });
    };
    handleSubmit(makeRequest, closeActiveModal);
  };

  function handleCardDelete() {
    const token = localStorage.getItem("jwt"); // Define token
    const makeRequest = () =>
      deleteItem(selectedCard._id, token).then(() => {
        setClothingItems((cards) =>
          cards.filter((card) => card._id !== selectedCard._id)
        );
      });

    handleSubmit(makeRequest, closeActiveModal);
  }

  const openConfirmationDeleteModal = () => {
    setActiveModal("delete-confirmation");
  };

  const getUserData = () => {
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
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    setIsLoading(true);
    register({ email, password, name, avatar })
      .then((res) => {
        if (!res) {
          throw new Error("Registration failed");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.message.includes("409")) {
          setErrorMessage("This email is already registered");
        } else if (err.message.includes("login")) {
          setErrorMessage(
            "Registration successful but login failed. Please try logging in."
          );
        } else {
          setErrorMessage(
            err.message || "Registration failed. Please try again."
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = ({ email, password }) => {
    login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          closeActiveModal();
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message || "An error occurred during login");
      });
  };

  const handleUpdateProfile = (updatedData) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true); // Add loading state
    updateProfile({
      ...updatedData,
      token,
    })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state
      });
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const likeRequest = !isLiked ? addCardLike : removeCardLike;

    likeRequest(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => {
        console.error(err);
        // Optionally set an error message for the user
      });
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("jwt");
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegistrationModal = () => {
    setActiveModal("register");
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
      .catch((error) => {
        setErrorMessage("Unable to load weather data. Please try again later.");
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch((error) => {
        setErrorMessage(
          "Unable to load clothing items. Please refresh the page."
        );
        console.error("Error fetching clothing items:", error);
      });
  }, []);

  useEffect(() => {
    getUserData();
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
              onLoginClick={openLoginModal}
              setErrorMessage={setErrorMessage}
              onRegisterClick={openRegistrationModal}
              onEditProfile={handleEditProfile}
              handleSignOut={handleSignOut}
              onAddNewItem={handleAddClick}
              isLoggedIn={currentUser !== null}
            />
            <Routes>
              <Route
                path="/"
                element={
                  weatherData.temp ? (
                    <Main
                      weatherData={weatherData}
                      cards={clothingItems}
                      onCardClick={handleCardClick}
                      onLikeCard={handleCardLike}
                    />
                  ) : (
                    <p>Loading...</p>
                  )
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute currentUser={currentUser}>
                    <Profile
                      clothingItems={clothingItems}
                      onSelectCard={handleCardClick}
                      onAddNewItem={handleAddClick}
                      onCardLike={handleCardLike}
                      handleEditProfile={handleEditProfile}
                      isLoggedIn={currentUser !== null}
                      currentUser={currentUser}
                    />
                  </ProtectedRoute>
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
            currentUser={currentUser}
          />
          <ConfirmationDeleteModal
            onClose={closeActiveModal}
            handleDeleteConfirm={handleCardDelete}
            isOpen={activeModal === "delete-confirmation"}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onSubmit={handleRegister}
            onClickLogin={openLoginModal}
            onClose={closeActiveModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onSubmit={handleLogin}
            onClickRegister={openRegistrationModal}
            onClose={closeActiveModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleUpdateProfile}
            errorMessage={errorMessage}
            currentUser={currentUser}
          />
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
              <button onClick={() => setErrorMessage(null)}>&times;</button>
            </div>
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
