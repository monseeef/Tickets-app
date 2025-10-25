// In src/components/Modal.jsx
import React from "react";
import "./Modal.css"; // We'll create this next

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // The backdrop
    <div className="modal-backdrop" onClick={onClose}>
      {/* The content box, stopPropagation stops the modal
          from closing when we click INSIDE it */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="modal-close-btn">
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
