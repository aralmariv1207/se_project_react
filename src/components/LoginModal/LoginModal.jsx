import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({ isOpen, onClose, onSubmit, onClickRegister }) {
  const { values, errors, handleChange, reset, isValid } = useFormAndValidation(
    {
      email: "",
      password: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && Object.keys(errors).length === 0) {
      onSubmit(values);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      secondaryButtonText={"or Sign up"}
      secondaryButtonAction={onClickRegister}
    >
      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          required
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p className="modal__error">{errors.email}</p>}
      </label>

      <label className="modal__label">
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          minLength="8"
          maxLength="30"
          required
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p className="modal__error">{errors.password}</p>}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
