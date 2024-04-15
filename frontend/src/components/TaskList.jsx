import React from "react";
import Task from "./Task";

const TaskList = ({
  tasks,
  onDelete,
  onToggleCompleted,
  sortField,
  sortOrder,
}) => {
  // sort tasks based on the field and descending/ascending
  const sortedTasks = tasks.slice().sort((a, b) => {
    switch (sortField) {
      case "title":
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      case "completed":
        return sortOrder === "asc"
          ? a.completed
            ? 1
            : -1
          : b.completed
          ? 1
          : -1;
      default:
        return a.id - b.id; // by default, just sort by order of id (this is effectively by order of creation)
    }
  });

  return (
    <ul>
      {sortedTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </ul>
  );
};

export default TaskList;
