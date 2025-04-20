import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "utils/constants";
import Header from "components/Header/Header";
import Main from "components/Main/Main";
import ItemModal from "components/ItemModal/ItemModal";
import { getWeather } from "utils/weatherApi";
import Footer from "components/Footer/Footer";
import CurrentTemperatureUnitContext from "contexts/CurrentTemperatureUnitContext";
import AddItemModal from "components/AddItemModal/AddItemModal";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "components/Profile/Profile";
import { ConfirmationDeleteModal } from "components/ConfirmationDeleteModal/ConfirmationDeleteModal";
import {
  getItems,
  deleteItem,
  addItem,
  login,
  register,
  checkToken,
} from "utils/api";
import RegisterModal from "components/RegisterModal/RegisterModal";
import LoginModal from "components/LoginModal/LoginModal";
import CurrentUserContext from "contexts/CurrentUserContext";

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
    addItem({ name, imageUrl, weather })
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
    deleteItem(cardToDelete._id)
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
            <Header>
              <div className="header__auth-buttons">
                {currentUser ? (
                  <div>
                    <span>Welcome, {currentUser.name}!</span>
                    <button
                      onClick={() => {
                        setCurrentUser(null);
                        localStorage.removeItem("jwt");
                      }}
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => setIsLoginModalOpen(true)}>
                      Log in
                    </button>
                    <button onClick={() => setIsRegisterModalOpen(true)}>
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            </Header>

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onSelectCard={handleCardClick}
                    onAddNewItem={handleAddClick}
                    clothingItems={clothingItems}
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
            onClose={() => setIsRegisterModalOpen(false)}
            onSubmit={handleRegister}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onSubmit={handleLogin}
            errorMessage={errorMessage}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
