import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onSubmit, onClickRegister }) {
  const { values, errors, handleChange, setErrors, resetForm } = useForm({
    email: "",
    password: "",
  });

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

  const validateField = (name, value) => {
    if (!value) {
      return `${name} is required`;
    }
    switch (name) {
      case "email":
        return !EMAIL_REGEX.test(value)
          ? "Please enter a valid email address"
          : "";
      case "password":
        return !PASSWORD_REGEX.test(value)
          ? "Password must be at least 8 characters long and include a letter and a number"
          : "";
      default:
        return "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(formErrors);
    }
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });
    return newErrors;
  };

  const handleClose = () => {
    resetForm();
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
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          onBlur={handleFieldBlur}
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
          onBlur={handleFieldBlur}
        />
        {errors.password && <p className="modal__error">{errors.password}</p>}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
