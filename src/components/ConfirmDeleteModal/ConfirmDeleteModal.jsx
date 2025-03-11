import 'ConfirmDeleteModal.css';

function ConfirmDeleteModal({ handleCardDelete, handleClothing }) {
    
}

const handleDeleteConfirm = (itemId) => {
    deleteItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
        closeModal();
      })
      .catch((error) => console.error(error));
  };
  
export default ConfirmDeleteModal;