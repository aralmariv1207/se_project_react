import { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";

function EditProfileModal({ isOpen, onClose, onSubmit, errorMessage }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const { values, errors, handleChange } = useForm({
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  const handleClose = () => {
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
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
      {errorMessage && <p className="modal__error">{errorMessage}</p>}
      <label className="modal__label">
        Name *
        <input
          className="modal__input"
          type="text"
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
