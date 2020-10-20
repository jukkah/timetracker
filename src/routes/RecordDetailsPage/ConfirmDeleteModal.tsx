import React, { useCallback } from 'react';

interface ConfirmDeleteModalProps {
  onCancel: () => void;
  onDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onCancel, onDelete }) => {
  return (
    <div className="backdrop" onClick={onCancel}>
      <div className="modal" onClick={useCallback(e => e.stopPropagation(), [])}>
        <main>
          Poistetaanko kirjaus?
        </main>
        <footer>
          <button onClick={onCancel} className="button">Peruuta</button>
          <button onClick={onDelete} className="button primary danger">Poista</button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
