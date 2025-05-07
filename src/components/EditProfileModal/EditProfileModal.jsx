import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfileModal({ isOpen, onSubmit, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, errors, isValid } =
    useFormAndValidation({
      name: currentUser?.name || "",
      avatar: currentUser?.avatar || "",
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
    }
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
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          value={values.name || ""}
          required
          onChange={handleChange}
        />
        {errors.name && <p className="modal__error">{errors.name}</p>}
      </label>

      <label className="modal__label">
        Avatar*
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        {errors.avatar && <p className="modal__error">{errors.avatar}</p>}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
