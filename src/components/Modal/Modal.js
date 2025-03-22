import { useEffect } from "react";

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  const handleOverlayClickClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClickClose}>
      <div className="modal__container">
        {children}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
};
