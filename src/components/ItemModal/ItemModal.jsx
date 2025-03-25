import "./ItemModal.css";
import { Modal } from "../Modal/Modal.jsx";

function ItemModal({ activeModal, onClose, card, openDeleteModal }) {
  return (
    activeModal === "preview" && (
      <Modal
        onClose={onClose}
        isOpen={activeModal === "preview"}
        containerModifier={"modal__content_type_image"}
      >
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            className="modal__delete_btn"
            type="button"
            onClick={openDeleteModal}
          >
            Delete item
          </button>
        </div>
      </Modal>
    )
  );
}

export default ItemModal;
