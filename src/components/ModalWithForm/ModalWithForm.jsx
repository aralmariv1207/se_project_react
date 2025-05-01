import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";
import { Modal } from "../Modal/Modal.jsx";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  secondaryButtonText,
  secondaryButtonAction,
}) {
  return (
    isOpen && (
      <Modal onClose={onClose} isOpen={isOpen}>
        <h2 className="modal__title">{title}</h2>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button type="submit" className="modal__submit" disabled={isLoading}>
            {buttonText}
          </button>
          {secondaryButtonText && (
            <button onClick={secondaryButtonAction}>
              {secondaryButtonText}
            </button>
          )}
        </form>
      </Modal>
    )
  );
}

export default ModalWithForm;
