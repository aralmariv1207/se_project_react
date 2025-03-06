import { defaultClothingItems } from "../../utils/constants";

function ClothesSection() {
    return (
    <div className="clothes-section">
    <p>Your Items</p>
    <button>+ Add New</button>
    </div>
    <ul className="cards__list">
    {clothingItems.map((item) => {
        return (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
          />
        );
      })}
  </ul>
    );
}

export default ClothesSection;