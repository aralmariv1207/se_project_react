import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
  isLoading,
}) {
  const { values, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const isFormValid = () => {
    return (
      values.name.length >= 2 &&
      values.imageUrl.match(/^https?:\/\/.+/i) &&
      values.weather &&
      Object.values(errors).every((error) => error === "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim whitespace from text inputs
    const trimmedValues = {
      name: values.name.trim(),
      imageUrl: values.imageUrl.trim(),
      weather: values.weather,
    };

    // Validate all fields before submission
    const newErrors = {
      name: validateField("name", trimmedValues.name),
      imageUrl: validateField("imageUrl", trimmedValues.imageUrl),
      weather: validateField("weather", trimmedValues.weather),
    };

    setErrors(newErrors);

    // Only submit if there are no errors
    if (Object.values(newErrors).every((error) => error === "")) {
      onAddItemModalSubmit(trimmedValues);
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.length === 0
          ? "Name is required"
          : value.length < 2
          ? "Name must be at least 2 characters"
          : "";
      case "imageUrl":
        return value.length === 0
          ? "Image URL is required"
          : !value.match(/^https?:\/\/.+/i)
          ? "Please enter a valid URL"
          : "";
      case "weather":
        return value.length === 0 ? "Please select a weather type" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
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
          onChange={handleChange}
          value={values.name}
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
