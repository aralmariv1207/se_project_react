import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onSubmit, onClickRegister }) {
  const { values, errors, handleChange, setErrors, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(formErrors);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleEmailError = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    setErrors((prev) => ({
      ...prev,
      email: !emailRegex.test(value)
        ? "Please enter a valid email address."
        : "",
    }));
  };

  const handlePasswordError = (e) => {
    const value = e.target.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setErrors((prev) => ({
      ...prev,
      password: !passwordRegex.test(value)
        ? "Password must be at least 8 characters long and include a letter and a number."
        : "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include a letter and a number.";
    }

    return newErrors;
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
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          onBlur={handleEmailError}
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
        />
        {errors.password && <p className="modal__error">{errors.password}</p>}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
