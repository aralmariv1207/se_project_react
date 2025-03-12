import 'ConfirmDeleteModal.css';

function ConfirmDeleteModal({ handleCardDelete, handleClothing }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close modal__close_type_image">
        
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div>
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button className="modal__garment-type" onClick={() => openDeleteModal(card)}>Delete item</button>
        </div>
      </div>
    </div>
  )
}

const handleDeleteConfirm = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        closeModal();
      })
      .catch((error) => console.error(error));
  };
  
export default ConfirmDeleteModal;