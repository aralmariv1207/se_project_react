import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation({
      name: "",
      imageUrl: "",
      weather: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && Object.values(errors).every((error) => error === "")) {
      onAddItemModalSubmit(values)
        .then(() => {
          // Reset form values only after successful submission
          resetForm();
        })
        .catch((err) => {
          // Handle any errors, such as displaying a message
          console.error(err);
        });
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isValid || Object.keys(errors).length > 0}
      isLoading={isLoading}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          id="name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChange}
          value={values.name}
          pattern="[A-Za-z\s-]+"
          title="Name should only contain letters, spaces, and hyphens"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image*
        <input
          className={`modal__input ${
            errors.imageUrl ? "modal__input_error" : ""
          }`}
          type="url"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
          required
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="radio-group">
          <div>
            <input
              id="hot"
              type="radio"
              name="weather"
              value="hot"
              required={true}
              onChange={handleChange}
              checked={values.weather === "hot"}
            />
            <label htmlFor="hot">Hot</label>
          </div>
          <div>
            <input
              id="warm"
              type="radio"
              name="weather"
              value="warm"
              required={true}
              onChange={handleChange}
              checked={values.weather === "warm"}
            />
            <label htmlFor="warm">Warm</label>
          </div>
          <div>
            <input
              id="cold"
              type="radio"
              name="weather"
              value="cold"
              required={true}
              onChange={handleChange}
              checked={values.weather === "cold"}
            />
            <label htmlFor="cold">Cold</label>
          </div>
          {errors.weather && (
            <span className="radio-group__error">{errors.weather}</span>
          )}
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
