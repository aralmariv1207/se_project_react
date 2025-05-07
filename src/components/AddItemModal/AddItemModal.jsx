import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, handleChange, errors, setErrors, isValid, resetForm } =
    useFormAndValidation({
      name: "",
      imageUrl: "",
      weather: "",
    });

  const isFormValid = () => {
    const newErrors = { ...errors };
    if (!values.weather) {
      newErrors.weather = "Please select a weather type";
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddItemModalSubmit(values);
      resetForm();
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isFormValid()}
      isLoading={isLoading}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          onChange={handleChange}
          value={values.name || ""}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleChange}
          value={values.imageUrl}
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
