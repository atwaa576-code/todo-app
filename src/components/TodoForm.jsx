import React, { useState } from "react";

function TodoForm() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTask = () => {
    if (input.trim() === "") {
      return;
    }
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const editTask = (id) => {
    const taskToedit = tasks.find((task) => task.id == id);
    const newText = prompt("Enter new task", taskToedit.text);
    if (newText == null) {
      return;
    }
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  };

  return (
    <>
    <h1>To Do List APP</h1>
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Enter a task"
          onChange={handleChange}
          value={input}
        />

        <button type="button" className="btn add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <button
        type="button"
        className="btn clear-btn"
        onClick={() => setTasks([])}
      >
        Clear All
      </button>
      <div>
        {tasks.map((task) => (
          <div
            className={`task ${task.completed ? "completed" : ""}`}
            key={task.id}
          >
            <p>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>

              {task.completed ? "✅ " : "❌ "}
            </p>
            <button
              className="btn delete-btn"
              type="button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

            <button
              type="button"
              className="btn edit-btn"
              onClick={() => {
                editTask(task.id);
              }}
            >
              Edit
            </button>

            <button
              className="btn complete-btn"
              type="button"
              onClick={() => completedTask(task.id)}
            >
              {task.completed ? "Undo" : "complete"}
            </button>
          </div>
        ))}
      </div>

      <p>Remaining :{tasks.filter((task) => !task.completed).length} </p>
      <p>Completed :{tasks.filter((task) => task.completed).length} </p>
    </form>
    </>
  );
}

export default TodoForm;
