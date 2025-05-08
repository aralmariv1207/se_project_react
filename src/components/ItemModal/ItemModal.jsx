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
        containerModifier={"modalcontent_type_image"}
      >
        <img src={card.imageUrl} alt={card.name} className="modalimage" />
        <div className="modalfooter">
          <div>
            <p className="modalcaption">{card.name}</p>
            <p className="modalweather">Weather: {card.weather}</p>
          </div>
          {canDelete && (
            <button
              onClick={() => openDeleteModal(card)}
              className="modaldelete_btn"
            >
              Delete
            </button>
          )}
        </div>
      </Modal>
    )
  );
}
export default ItemModal;
