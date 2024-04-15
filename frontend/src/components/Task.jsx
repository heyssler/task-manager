import React from "react";

const Task = ({ task, onDelete, onToggleCompleted }) => {
  const { id, title, description, completed } = task;
  return (
    <li key={id} className={`task ${completed ? "completed" : ""}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
        />
        <h3>{title}</h3>
        <i>{description}</i>
      </div>
      <button className="delete-btn" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};

export default Task;
