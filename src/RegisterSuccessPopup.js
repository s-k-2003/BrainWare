import React, { useState, useEffect } from "react";
import "./LoginSuccessPopup.css"; // Import the CSS file for styling

const RegisterSuccessPopup = ({ onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 25);
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      onClose();
    }
  }, [progress, onClose]);

  return (
    <div className="login-success-popup">
      <div className="login-success-content">
        <h3>Register Successful!</h3>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default  RegisterSuccessPopup;
