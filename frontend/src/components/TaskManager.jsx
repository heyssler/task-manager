import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";

const API_URL = "http://localhost:5000/tasks";

const TaskManager = () => {
  // manage task state
  const [tasks, setTasks] = useState([]);
  // manage sort state, and set defaults
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // call the flask API to update task state
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  // send a PUT request to the API when changing 'completed' status
  const handleToggleCompleted = async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !tasks.find((t) => t.id === taskId).completed,
      }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
    }
  };

  const handleAddTask = async (title, description) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      // reset sort order to ascending when switching fields
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <h1 className="centered-heading">Task Manager</h1>
      <form onSubmit={(e) => e.preventDefault()} className="task-form">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" required />
        <label htmlFor="description">Description (Optional):</label>
        <textarea id="description" />
        <button
          type="submit"
          onClick={() =>
            handleAddTask(
              document.getElementById("title").value,
              document.getElementById("description").value
            )
          }
        >
          Add Task
        </button>
      </form>
      {/* conditionally render the sorting options only if there are tasks */}
      {tasks.length > 0 && (
        <div className="sorting-options">
          <h1>Sort by:</h1>
          <button onClick={() => handleSort("title")}>
            Title {sortField === "title" && `(${sortOrder})`}
          </button>
          <button onClick={() => handleSort("completed")}>
            Completed {sortField === "completed" && `(${sortOrder})`}
          </button>
        </div>
      )}
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggleCompleted={handleToggleCompleted}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default TaskManager;
