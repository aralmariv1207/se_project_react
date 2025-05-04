import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function RegisterModal({
  isOpen,
  onClose,
  onSubmit,

  onClickLogin,
}) {
  const { values, errors, handleChange, setErrors, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
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

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Name validation
    if (!values.name) {
      newErrors.name = "Name is required";
    }

    // Avatar URL validation
    if (!values.avatar) {
      newErrors.avatar = "Avatar URL is required";
    } else {
      try {
        new URL(values.avatar);
      } catch (e) {
        newErrors.avatar = "Please enter a valid URL";
      }
    }
    return newErrors;
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
