import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";
import { Modal } from "../Modal/Modal.jsx";

function ItemModal({
  activeModal,
  onClose,
  card,
  openDeleteModal,
  currentUser,
}) {
  const canDelete = currentUser && card.owner === currentUser._id;

  return (
    activeModal === "preview" && (
      <Modal
        onClose={onClose}
        isOpen={activeModal === "preview"}
        containerModifier={"modal__content_type_image"}
      >
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div>
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {canDelete && (
            <button
              onClick={() => openDeleteModal(card)}
              className="modal__delete-btn"
            >
              Delete item
            </button>
          )}
        </div>
      </Modal>
    )
  );
}

export default ItemModal;
