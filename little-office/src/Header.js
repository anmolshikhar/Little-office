import "./header.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {

  // Logged in user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const userEmail = user?.email || "No Email";
  const userName = user?.name || "Guest";
  const userId = user?.user_id || "N/A";

  // Points from users table
  const points = user?.points || 0;

  // Tasks count
  const [tasks, setTasks] = useState(0);

  useEffect(() => {

    if (userId !== "N/A") {

      fetch(
       `https://little-office-backend.onrender.com/user-stats/${userId}`
      )
        .then((res) => res.json())
        .then((data) => {

          setTasks(data.totalTasks || 0);

        })
        .catch((err) => {
          console.log(err);
        });

    }

  }, [userId]);

  return (
    <div className="home-container">

      {/* Header */}
      <div className="header">

        <h1 className="title">
          LITTLE OFFICE
        </h1>

        <div className="user-info">

          <p>
            <strong>{userName}</strong>
          </p>

          <p>
            ID: {userId}
          </p>

          <span>{userEmail}</span>

        </div>

      </div>

      {/* Main Section */}
      <div className="main-section">

        {/* Sidebar */}
        <div className="menu-grid">

          <Link
            className="menu-card"
            to="/tasks"
          >
            Tasks
          </Link>

          <Link
            className="menu-card"
            to="/submit-task"
          >
            Submit Task
          </Link>

          <Link
            className="menu-card"
            to="/client-meetings"
          >
            Client Meetings
          </Link>

          <Link
            className="menu-card"
            to="/about"
          >
            About Us
          </Link>

        </div>

        {/* Content Area */}
        <div className="content-area">

          <h2>
            Welcome to Little Office 🚀
          </h2>

          <p>
            Little Office is a platform where
            developers complete tasks, earn
            points, improve skills, and unlock
            real-world client projects.
          </p>

          <div className="stats">

            <div className="stat-card">
              <h3>{points}</h3>
              <p>Points</p>
            </div>

            <div className="stat-card">
              <h3>{tasks}</h3>
              <p>Tasks</p>
            </div>

            <div className="stat-card">
              <h3>0</h3>
              <p>Projects</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Header;