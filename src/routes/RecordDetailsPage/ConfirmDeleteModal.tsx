import React from 'react';

interface ConfirmDeleteModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onCancel, onDelete }) => {
  return (
    <div className="page modal">
      <main>
        Poistetaanko kirjaus?
      </main>
      <footer>
        <button onClick={onCancel} className="button">Peruuta</button>
        <button onClick={onDelete} className="button primary danger">Poista</button>
      </footer>
    </div>
  );
};

export default ConfirmDeleteModal;
