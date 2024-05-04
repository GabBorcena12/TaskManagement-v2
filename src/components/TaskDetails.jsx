import React from "react";

const TaskDetails = ({ task, onClose, modalDarkMode }) => {
  return (
    <div className="custom-modal-overlay">
      <div className={`custom-modal-container ${modalDarkMode ? 'dark' : ''}`} style={{ width: "25%", height: "35%" }}>
        <div>
          <h1>Task Details</h1>
          <p>{task.taskName.toUpperCase()}</p>
          <p>
            {task.taskDescription.charAt(0).toUpperCase() +
              task.taskDescription.slice(1).toLowerCase()}
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
