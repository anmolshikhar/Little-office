
import React, { useState } from "react";
import "./signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [workStatus, setWorkStatus] = useState("Student");
  const [email, setEmail] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
            workStatus,
            email,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          "Account Created Successfully ✅\nCheck your email for User ID and Password"
        );

        setName("");
        setPhone("");
        setWorkStatus("Student");
        setEmail("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">

        <h1>Create Account</h1>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="👤 Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="tel"
            placeholder="📱 Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <select
            value={workStatus}
            onChange={(e) =>
              setWorkStatus(e.target.value)
            }
          >
            <option value="Student">
              Student
            </option>

            <option value="Fresher">
              Fresher
            </option>

            <option value="Working">
              Working
            </option>
          </select>

          <input
            type="email"
            placeholder="📧 Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button type="submit">
            Create Account
          </button>

        </form>

      </div>
    </div>
  );
}

export default Signup;
