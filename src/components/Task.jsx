import { useEffect, useState } from "react";
import "../App.css";
import "../styling/home.css";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";

const Task = ({modalDarkMode}) => {
  const [openTaskForm, setTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState("");
  const HandleSubmitTask = (formData) => {
    setTasks([...tasks, formData]);
    setTaskForm(false);
  };

  const CloseModal = () => {
    setTaskForm(false);
  };

  const ViewTask = (index) => {
    setSelectedTaskIndex(index);
  };

  // Filter tasks based on the keyword
  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  const DeleteTask = (index) => {
    //if not filtered delete selected index
    if (filterKeyword === "") {
      const updatedTasks = tasks.filter((task, i) => i !== index);
      setTasks(updatedTasks);
      setSelectedTaskIndex(null);
    } else {
      // Filter applied, get the real index of the selected task in tasks array
      const realIndex = tasks.findIndex(
        (task) => task === filteredTasks[index]
      );
      if (realIndex !== -1) {
        const updatedTasks = tasks.filter((task, i) => i !== realIndex);
        setTasks(updatedTasks);
        setSelectedTaskIndex(null);
      }
    }
  };

  return (
    <>
      {/*Add New Task*/}
      <div className="home-header-container">
        <button
          style={{ width: "10rem" }}
          onClick={() => {
            setTaskForm(true);
          }}
        >
          New Task
        </button>
      </div>

      {/*Search Filter*/}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Enter task name to filter"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />
      </div>

      {openTaskForm && (
        <TaskForm modalDarkMode={modalDarkMode} closeModal={CloseModal} submitTask={HandleSubmitTask} />
      )}
      {/*Task Detail*/}
      {selectedTaskIndex != null && (
        <TaskDetails
          modalDarkMode={modalDarkMode}
          task={tasks[selectedTaskIndex]}
          onClose={() => setSelectedTaskIndex(null)}
        />
      )}

      {/*Task List*/}
      {tasks.length === 0 && filterKeyword === "" && (
        <h3>No task available ..</h3>
      )}

      {filterKeyword !== "" && filteredTasks.length === 0 && (
        <h3>No matching tasks found for "{filterKeyword}"</h3>
      )}

      {filterKeyword === "" && tasks.length > 0 && (
        <TaskList
          modalDarkMode={modalDarkMode}
          tasks={tasks}
          onViewTask={ViewTask}
          onDeleteTask={DeleteTask}
        />
      )}

      {filterKeyword !== "" && filteredTasks.length > 0 && (
        <TaskList
          modalDarkMode={modalDarkMode}
          tasks={filteredTasks}
          onViewTask={ViewTask}
          onDeleteTask={DeleteTask}
        />
      )}
    </>
  );
};

export default Task;
