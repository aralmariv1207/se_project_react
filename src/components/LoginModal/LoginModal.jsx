import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onSubmit, onClickRegister }) {
  const { values, errors, handleChange, setValues, setErrors } = useForm({
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

  const handleEmailError = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      setErrors("Please enter a valid email address.");
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handlePasswordError = (e) => {
    const value = e.target.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(value)) {
      setErrors(
        "Password must be at least 8 characters long and include a letter and a number."
      );
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
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
      {setErrors && <p className=""></p>}
      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          onBlur={handleEmailError}
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
          onBlur={handlePasswordError}
          required
        />
        {errors.password && <p className="modal__error">{errors.password}</p>}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
