import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({ onClose, isOpen}) {
    return (
    <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={isOpen}
        onClose={onClose}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <div>
            <input id="hot" type="radio" name="weather" className="modal__radio-input" />
            <label htmlFor="hot" className="modal__label modal__label_type_radio">
            Hot
            </label>
            </div>
          <div>
            <input id="warm" type="radio" name="weather" className="modal__radio-input" />
            <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
            >
            Warm
            </label>
            </div>
          <div>
            <input id="cold" type="radio" name="weather" className="modal__radio-input" />
            <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
            >
            
            Cold
            </label>
            </div>
        </fieldset>
      </ModalWithForm>
      );
}