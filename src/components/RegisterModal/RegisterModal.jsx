import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegisterModal({ isOpen, onClose, onSubmit, onClickLogin }) {
  const { values, errors, handleChange, setErrors, setIsValid, reset } =
    useFormAndValidation({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields have values and there are no errors
    if (
      Object.values(values).every((value) => value) &&
      Object.keys(errors).length === 0
    ) {
      onSubmit(values);
    } else {
      setIsValid(false);
      // Set errors for empty required fields
      const formErrors = {};
      Object.entries(values).forEach(([key, value]) => {
        if (!value) {
          formErrors[key] = "This field is required";
        }
      });
      setErrors(formErrors);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Next"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryButtonText={"or Log in"}
      secondaryButtonAction={onClickLogin}
    >
      <label className="modal__label">
        Email*
        <input
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password*
        <input
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      <label className="modal__label">
        Name*
        <input
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          className={`modal__input ${
            errors.avatar ? "modal__input_error" : ""
          }`}
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;