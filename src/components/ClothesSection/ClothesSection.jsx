import { defaultClothingItems } from "../../utils/constants";
import './ClothesSection.css';

function ClothesSection({ handleCardClick}) {
    return (
    <>
    <div className="clothes-section">
    <p>Your Items</p>
    <button>+ Add New</button>
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
  </>
    );
}

export default ClothesSection;