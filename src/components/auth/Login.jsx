import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../services/userService";


export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login attempted");

    try {
      const data = await loginUser(username, password);
      console.log("Login response:", data);

      if (data.token) {
        localStorage.setItem("recipe_token", data.token);
        localStorage.setItem("recipe_user", JSON.stringify({
          id: data.user_id,
          username: data.username
        }));
        console.log("Token stored, attempting navigation");
        navigate("/");
      } else {
        console.log("No token in response");
        window.alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      window.alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">Roll for Recipe</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="text"
                value={username}
                className="auth-form-input"
                onChange={(evt) => setUsername(evt.target.value)}
                placeholder="Username"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="password"
                value={password}
                className="auth-form-input"
                onChange={(evt) => setPassword(evt.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button type="submit">Sign in</button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};