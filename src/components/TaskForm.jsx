import React, { useReducer } from "react";
import "../styling/form.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return { taskName: "", taskDescription: "" };
    default:
      return state;
  }
};

const TaskForm = (props) => {
  const {modalDarkMode} = props;
  const initialFormState = { taskName: "", taskDescription: "" };
  const [formData, dispatchformData] = useReducer(
    formReducer,
    initialFormState
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatchformData({ type: "UPDATE_FIELD", field: name, value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatchformData({ type: "RESET_FORM" });
    props.submitTask(formData);
  };

  const HandleCloseModal = (e) => {
    e.preventDefault();
    dispatchformData({ type: "RESET_FORM" });
    props.closeModal();
  };

  return (
    <div className="custom-modal-overlay">
      <div className={`custom-modal-container ${modalDarkMode ? 'dark' : ''}`} style={{ width: "25%", height: "55%" }}>
        <form onSubmit={HandleSubmit}>
          <h1>Task Manager</h1>
          <div className="form-group">
            <label htmlFor="taskName">Name</label>
            <input
              id="taskName"
              name="taskName"
              type="text"
              value={formData.taskName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Description</label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              type="text"
              value={formData.taskDescription}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="modal-button-container">
            <button className="modalbutton" type="submit">
              Add
            </button>
            <button className="modalbutton" onClick={HandleCloseModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
