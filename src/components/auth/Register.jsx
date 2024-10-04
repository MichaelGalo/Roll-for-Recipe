import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUser } from '../../services/userService';
import "./Login.css"

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
  
    try {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
        email: email
      };
  
      const response = await createUser(newUser);
  
      if (response.token) {
        localStorage.setItem("recipe_token", response.token);
        localStorage.setItem("recipe_user", JSON.stringify({
          id: response.user_id,
          username: response.username
        }));
        navigate('/');
      } else {
        console.error("Registration failed:", response);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Roll for Recipe</h1>
        <h2>Register New Account</h2>
        <fieldset className="auth-fieldset">
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="auth-form-input"
            placeholder="First Name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset className="auth-fieldset">
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="auth-form-input"
            placeholder="Last Name"
            required
          />
        </fieldset>
        <fieldset className="auth-fieldset">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-form-input"
            placeholder="Username"
            required
          />
        </fieldset>
        <fieldset className="auth-fieldset">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-form-input"
            placeholder="Email"
            required
          />
        </fieldset>
        <fieldset className="auth-fieldset">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-form-input"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset className="auth-fieldset">
          <button type="submit">Register</button>
        </fieldset>
      </form>
      <section className="register-link">
        <Link to="/login">Already have an account?</Link>
      </section>
    </main>
  );
};