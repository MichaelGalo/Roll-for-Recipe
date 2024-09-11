import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";

//TODO: possible issue with email/name vs. email/password

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    name: "",
  });
  let navigate = useNavigate();

  const registerNewUser = async () => {
    const newUser = {
      ...user,
    };

    try {
      const createdUser = await createUser(newUser);
      if (createdUser.id) {
        localStorage.setItem(
          "recipe_token",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      window.alert("Error creating user. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await getUserByEmail(user.email);
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        await registerNewUser();
      }
    } catch (error) {
      console.error("Error checking user email:", error);
      window.alert("Error checking user email. Please try again.");
    }
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Roll for Recipe</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
