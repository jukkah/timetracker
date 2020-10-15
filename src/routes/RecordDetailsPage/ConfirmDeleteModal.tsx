import React from 'react';

interface ConfirmDeleteModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onCancel, onDelete }) => {
  return (
    <>
      Poistetaanko kirjaus?
      <button onClick={onCancel}>Peruuta</button>
      <button onClick={onDelete}>Poista</button>
    </>
  );
};

export default ConfirmDeleteModal;
