
import React, { useState } from "react";
import "./TaskManager.css";

const TaskManager = () => {

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete React Assignment",
      description: "Finish the React CRUD application.",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Study JavaScript",
      description: "Practice array methods and ES6 concepts.",
      priority: "Medium",
      completed: true,
    },
    {
      id: 3,
      title: "Design Dashboard",
      description: "Create a responsive dashboard UI.",
      priority: "Low",
      completed: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editId, setEditId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  // Add and Update Task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title!");
      return;
    }

    if (editId !== null) {

      const updatedTasks = tasks.map((task) =>
        task.id === editId
          ? {
              ...task,
              title: title.trim(),
              description: description.trim(),
              priority: priority,
            }
          : task
      );

      setTasks(updatedTasks);
      setEditId(null);

    } else {

      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        priority: priority,
        completed: false,
      };

      setTasks([...tasks, newTask]);
    }

    // Clear Form
    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  // Edit Task
  const handleEdit = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
  };

  // Delete Task
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== id));

      if (editId === id) {
        handleCancel();
      }
    }
  };

  // Mark Task Completed
  const handleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updatedTasks);
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {

    if (activeFilter === "Completed") {
      return task.completed;
    }

    if (activeFilter === "Pending") {
      return !task.completed;
    }

    return true;
  });

  // Task Statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="TaskManager-container">

      {/* Header */}
      <header className="TaskManager-header">

        <div>
          <h1>Task Manager</h1>
          <p>Organize your work and get things done.</p>
        </div>

        <div className="TaskManager-header-date">
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

      </header>

      {/* Statistics */}
      <div className="TaskManager-stats">

        <div className="TaskManager-stat-card">
          <span>Total Tasks</span>
          <h2>{totalTasks}</h2>
        </div>

        <div className="TaskManager-stat-card">
          <span>Completed</span>
          <h2>{completedTasks}</h2>
        </div>

        <div className="TaskManager-stat-card">
          <span>Pending</span>
          <h2>{pendingTasks}</h2>
        </div>

      </div>

      {/* Task Form */}
      <section className="TaskManager-form-section">

        <h2>
          {editId !== null ? "Edit Task" : "Add New Task"}
        </h2>

        <form
          className="TaskManager-form"
          onSubmit={handleSubmit}
        >

          <div className="TaskManager-input-group">

            <label>Task Title</label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          </div>

          <div className="TaskManager-input-group">

            <label>Description</label>

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />

          </div>

          <div className="TaskManager-input-group">

            <label>Priority</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >

              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>

            </select>

          </div>

          <div className="TaskManager-form-buttons">

            <button
              type="submit"
              className="TaskManager-submit-btn"
            >
              {editId !== null ? "Update Task" : "Add Task"}
            </button>

            {editId !== null && (

              <button
                type="button"
                className="TaskManager-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

            )}

          </div>

        </form>

      </section>

      {/* Task List */}
      <section className="TaskManager-list-section">

        <div className="TaskManager-list-header">

          <h2>My Tasks</h2>

          <div className="TaskManager-filters">

            {["All", "Pending", "Completed"].map((filter) => (

              <button
                key={filter}
                className={
                  activeFilter === filter
                    ? "TaskManager-filter-btn active"
                    : "TaskManager-filter-btn"
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>

            ))}

          </div>

        </div>

        {/* Display Tasks */}
        <div className="TaskManager-task-list">

          {filteredTasks.length === 0 ? (

            <div className="TaskManager-empty">
              <h3>No Tasks Found</h3>
              <p>Add a new task to get started!</p>
            </div>

          ) : (

            filteredTasks.map((task) => (

              <div
                className={
                  task.completed
                    ? "TaskManager-task-card completed"
                    : "TaskManager-task-card"
                }
                key={task.id}
              >

                <div className="TaskManager-task-content">

                  <div className="TaskManager-task-title">

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleComplete(task.id)}
                    />

                    <h3>{task.title}</h3>

                  </div>

                  <p>{task.description || "No description provided."}</p>

                  <div className="TaskManager-task-meta">

                    <span
                      className={`TaskManager-priority ${task.priority.toLowerCase()}`}
                    >
                      {task.priority} Priority
                    </span>

                    <span
                      className={
                        task.completed
                          ? "TaskManager-status done"
                          : "TaskManager-status pending"
                      }
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>

                  </div>

                </div>

                <div className="TaskManager-task-actions">

                  <button
                    type="button"
                    className="TaskManager-edit-btn"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="TaskManager-delete-btn"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </section>

    </div>
  );
};

export default TaskManager;
