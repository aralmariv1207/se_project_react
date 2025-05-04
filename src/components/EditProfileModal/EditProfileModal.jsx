import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";

function EditProfileModal({ isOpen, onSubmit, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, setErrors } = useForm({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!values.avatar.trim()) {
      newErrors.avatar = "Avatar URL is required";
    } else if (!isValidUrl(values.avatar)) {
      newErrors.avatar = "Please enter a valid URL";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(values);
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name *
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        {errors.name && <p className="modal__error">{errors.name}</p>}
      </label>

      <label className="modal__label">
        Avatar *
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
        />
        {errors.avatar && <p className="modal__error">{errors.avatar}</p>}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
