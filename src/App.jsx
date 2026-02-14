import { useState } from "react"
import './App.css'

function App() {
  const [todo, settodo] = useState([
    "Let's crack",
    "Complete project",
    "Go for a walk"
  ])
  
  const [input, setinput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Add new todo
  function submit(e) {
    e.preventDefault();
    if (input.trim() === "") return;
    
    if (isEditing) {
      // Update existing todo
      const updated = todo.map((item, idx) => 
        idx === editIndex ? input : item
      );
      settodo(updated);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new todo
      settodo([...todo, input]);
    }
    setinput("");
  }

  // Delete todo
  function deleteItem(idxdelete) {
    const update = todo.filter((ele, idx) => (
      idx !== idxdelete
    ))
    settodo(update);
  }

  // Start editing
  function startEdit(idx) {
    setinput(todo[idx]);
    setIsEditing(true);
    setEditIndex(idx);
  }

  // Cancel editing
  function cancelEdit() {
    setinput("");
    setIsEditing(false);
    setEditIndex(null);
  }

  return (
    <div className="app-container">
      <div className="todo-wrapper">
        <div className="header">
          <h1 className="title">
            ✨ My Todo List
          </h1>
          <p className="subtitle">Keep track of your daily tasks</p>
        </div>

        <form onSubmit={submit} className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setinput(e.target.value)}
            placeholder={isEditing ? "Update your task..." : "Add a new task..."}
            className="todo-input"
          />
          <div className="button-group">
            {isEditing && (
              <button 
                type="button" 
                onClick={cancelEdit} 
                className="cancel-btn"
              >
                <span className="btn-icon">✖️</span>
              </button>
            )}
            <button type="submit" className={isEditing ? "update-btn" : "add-btn"}>
              <span className="btn-text">{isEditing ? "Update" : "Add"}</span>
              <span className="btn-icon">{isEditing ? "✏️" : "➕"}</span>
            </button>
          </div>
        </form>

        <div className="todos-container">
          {todo.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>No tasks yet! Add one above.</p>
            </div>
          ) : (
            <ul className="todo-list">
              {todo.map((ele, idx) => (
                <li 
                  key={idx} 
                  className={`todo-item ${isEditing && editIndex === idx ? 'editing' : ''}`}
                >
                  <span className="todo-number">{idx + 1}</span>
                  <span className="todo-text">{ele}</span>
                  <div className="action-buttons">
                    <button 
                      onClick={() => startEdit(idx)} 
                      className="edit-btn"
                      aria-label="Edit task"
                      disabled={isEditing}
                    >
                      <span className="edit-icon">✏️</span>
                    </button>
                    <button 
                      onClick={() => deleteItem(idx)} 
                      className="delete-btn"
                      aria-label="Delete task"
                    >
                      <span className="delete-icon">🗑️</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="footer">
          <p className="task-count">
            {todo.length} {todo.length === 1 ? 'task' : 'tasks'} remaining
          </p>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h3 className="contact-title">📞 Contact Us</h3>
          <div className="contact-info">
            <a href="mailto:sauravuseidevery@gmail.com" className="contact-link">
              <span className="icon">📧</span>
              <span>sauravuseidevery@gmail.com</span>
            </a>
          </div>
          
        </div>

        {/* Copyright Section */}
        <div className="copyright-section">
          <p className="copyright-text">
            © 2024 Todo App. All rights reserved.
          </p>
          <p className="made-with">
            Made with <span className="heart">❤️</span> Saurav☺️
          </p>
          <div className="legal-links">
            <a href="#privacy" className="legal-link">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="#terms" className="legal-link">Terms of Service</a>
            <span className="separator">•</span>
            <a href="#cookie" className="legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
