import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onSelectCard,
  onAddNewItem,
  clothingItems,
  handleEditProfile,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={handleEditProfile} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={onSelectCard}
          handleAddClick={onAddNewItem}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
