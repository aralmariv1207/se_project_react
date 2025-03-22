import "./ModalWithForm.css";
import { Modal } from "./Modal";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} className="modal__form">
        {children}
        <button type="submit" className="modal__submit" disabled={isLoading}>
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
