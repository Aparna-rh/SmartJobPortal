import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const response = await fetch(
        "https://smartjobportal-production-25fb.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (data.id) {

        // Save complete user object
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        // Save userId separately for notifications
        localStorage.setItem(
          "userId",
          data.id
        );

        localStorage.setItem(
          "userRole",
          data.role
        );

        alert("Login Successful");

        if (data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }

      } else {

        alert("Invalid Credentials");

      }

    } catch (error) {

      console.log(error);
      alert("Login Failed");

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Welcome Back 👋</h2>

        <p className="subtitle">
          Login to your account
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={login}>
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;