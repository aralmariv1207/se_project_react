import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike(item);
  };

  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);

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
      </div>

      <button
        type="button"
        className={`card__like-button ${
          isLiked ? "card__like-button_active" : ""
        }`}
        onClick={handleLikeClick}
      />
    </li>
  );
}

export default ItemCard;
