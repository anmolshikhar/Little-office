import React, { useState } from "react";
import "./submit.css";

function SubmitTask() {
  const [taskTitle, setTaskTitle] = useState("");
  const [language, setLanguage] = useState("Java");
  const [code, setCode] = useState("");
  const user = JSON.parse(
  localStorage.getItem("user")
);

const userId = user?.user_id;
const name = user?.name;
const email = user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log(userId);
   console.log(name);
   console.log(email);

    const res = await fetch(
      "http://localhost:5000/submit-task",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId,
          name,
          email,
          taskTitle,
          language,
          code,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert(
        "Task Submitted Successfully 🎉 (+10 Points)"
      );

      setTaskTitle("");
      setLanguage("Java");
      setCode("");
    } else {
      alert("Submission Failed ❌");
    }
  };

  return (
    <div className="submit-page">
      <div className="submit-box">
        <h1>Submit Task</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={taskTitle}
            onChange={(e) =>
              setTaskTitle(e.target.value)
            }
            required
          />

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >
            <option>Java</option>
            <option>JavaScript</option>
            <option>Python</option>
            <option>C++</option>
            <option>React</option>
          </select>

          <textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) =>
              setCode(e.target.value)
            }
            rows="15"
            required
          />

          <button type="submit">
            Submit Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitTask;