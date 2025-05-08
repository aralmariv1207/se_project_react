import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const token = localStorage.getItem("jwt"); // Assuming token is stored in local storage

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);

  const handleLikeClick = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <li className="card">
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>
        {token && (
          <button
            type="button"
            className={`card__like-button ${
              isLiked ? "card__like-button_is-active" : ""
            }`}
            onClick={handleLikeClick}
          >
            ♥
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
