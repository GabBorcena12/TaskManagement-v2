import { useState } from "react";
import TaskDelete from "./TaskDelete";
import "../styling/table.css";

const TaskList = ({ tasks, onViewTask, onDeleteTask, modalDarkMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const DeleteTask = (index) => {
    setShowModal(true);
    setSelectedIndex(index);
  };

  const ConfirmDeleteTask = () => {
    onDeleteTask(selectedIndex);
    setShowModal(false);
    setSelectedIndex(null);
  };

  return (  
    <>
      <section className="table-container">
        {" "}
        <table>
          <thead>
            <tr>
              <th>Task list</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td className="tbody-column1">
                  {task.taskName.charAt(0).toUpperCase() +
                    task.taskName.slice(1).toLowerCase()}
                </td>
                <td>
                  <a
                    className="action-button"
                    onClick={() => onViewTask(index)}
                  >
                    View
                  </a>
                  <a
                    className="action-button"
                    onClick={() => DeleteTask(index)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {showModal && (
        <TaskDelete
          modalDarkMode={modalDarkMode}
          show={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          onConfirm={ConfirmDeleteTask}
          header="Delete"
          content="Are you sure you want to delete?"
        />
      )}
    </>
  );
};
export default TaskList;
