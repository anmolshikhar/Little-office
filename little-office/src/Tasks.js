import React, { useState } from "react";
import "./tasks.css";


function Tasks() {
  const [openTask, setOpenTask] = useState(null);

  const tasks = [
    {
      id: 1,
      title: "Build Login Page",
      description:
        "Create a responsive login page using React and CSS with email and password validation.",
    },

    {
      id: 2,
      title: "Create React Navbar",
      description:
        "Design a professional navbar with routing using React Router.",
    },

    {
      id: 3,
      title: "Solve SQL Queries",
      description:
        "Practice SELECT, JOIN, GROUP BY and aggregate functions.",
    },

    {
      id: 4,
      title: "Learn API Fetching",
      description:
        "Use fetch() or Axios to get data from APIs and display it.",
    },

    {
      id: 5,
      title: "DSA Practice",
      description:
        "Solve 5 array or string problems on LeetCode.",
    },
  ];

  const toggleTask = (id) => {
    if (openTask === id) {
      setOpenTask(null);
    } else {
      setOpenTask(id);
    }
  };

  return (
    <div className="tasks-page">
      <h1>Tasks for New Users</h1>

      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          <div
            className="task-title"
            onClick={() => toggleTask(task.id)}
          >
            {openTask === task.id ? "▼" : "▶"} {task.title}
          </div>

          {openTask === task.id && (
            <div className="task-description">
              {task.description}
            </div>
          )}
        </div>
      ))}
      <h5 className="task-note">
        🌟 Complete tasks, earn points, and stand out! Top performers may get a chance to work on real-world client projects.
      </h5>
    </div>
  );
}

export default Tasks;