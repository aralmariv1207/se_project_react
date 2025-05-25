import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "../ModalWithForm/ModalWithForm.css";
import { Modal } from "../Modal/Modal.jsx";
import "./ItemModal.css";

function ItemModal({
  activeModal,
  onClose,
  card,
  openDeleteModal,
}) {
   const { currentUser } = useContext(CurrentUserContext);
  const canDelete = currentUser && card.owner === currentUser._id;

  return (
    activeModal === "preview" && (
      <Modal
        onClose={onClose}
        isOpen={activeModal === "preview"}
        containerModifier={"modal__content_type_image"}
        buttonModifier={"modal__close_preview"}
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
              className="modal__delete_btn"
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
