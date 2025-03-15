import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";

function ClothesSection({ handleCardClick, handleAddClick, clothingItems }) {
  return (
    <>
      <div className="clothes-section">
        <div className="clothes-section__header">
          <p>Your items</p>
          <button className="add-item-button" onClick={handleAddClick}>+ Add new</button>
        </div>
        <ul className="clothes-section__list">
          {clothingItems.map((filteredCard) => (
            <ItemCard
              key={filteredCard._id}
              item={filteredCard}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default ClothesSection;
