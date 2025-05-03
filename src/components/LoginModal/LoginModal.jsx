import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  errorMessage,
  onClickRegister,
}) {
  const { values, errors, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleClose = () => {
    setValues({ email: "", password: "" });
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
      {errorMessage && <p className="modal__error-message">{errorMessage}</p>}
      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <p className="modal__error">{errors.email}</p>}
      </label>

      <label className="modal__label">
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {errors.password && <p className="modal__error">{errors.password}</p>}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
