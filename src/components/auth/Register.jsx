import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        // Store user_id and username separately since there is no 'user' object in response
        localStorage.setItem("recipe_user", JSON.stringify({
          id: response.user_id,
          username: response.username
        }));
        navigate('/'); // Redirect to home page or dashboard
      } else {
        // Handle registration errors
        console.error("Registration failed:", response);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };
  

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};