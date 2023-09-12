import React from 'react';
import './PopupMessage.css';

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className="epopup-container">
      <div className="epopup-content">
        <span className="eclose" onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PopupMessage;
