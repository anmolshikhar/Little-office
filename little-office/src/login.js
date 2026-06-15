
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkId = async () => {
    try {
      const res = await fetch("http://localhost:5000/check-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      
        // Save logged-in user's email
      if (data.exists) {

         localStorage.setItem(
          "user",
          JSON.stringify(data.user)
             );

            alert("Login Successful ✅");

              navigate("/home");
      }else {
        alert("Invalid Email or Password ❌");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    await checkId();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="📧 Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="🔒 Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>
        
        </form>
          <p>
               Don't have an account?
              < Link to="/signup">
                 Create Account
                  </Link>
           </p>
      </div>
    </div>
  );
}

export default Login;
