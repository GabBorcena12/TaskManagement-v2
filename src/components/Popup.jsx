import React, { useCallback } from "react";
import "../styling/modal.css";

const Popup = ({ modalDarkMode, onClose, show, header, content }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {show && (
        <div className="custom-modal-overlay">
          <div
            className={`custom-modal-container ${modalDarkMode ? 'dark' : ''}`}
            style={{ width: "25%", height: "25%", padding: "0rem" }}
          >
            <div className="modal-details-container">
              <div className="modal-header">
                <span>{header}</span>
              </div>
              <div className="modal-content">
                <span>{content}</span>
              </div>

              <div className="modal-button-container" style={{ paddingTop: "2rem" }}>
                <button onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
