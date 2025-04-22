import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLikeClick = () => {
    onCardLike(item);
  };

  const isLiked = currentUser && item.likes.some((id) => id === currentUser._id);

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />

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
