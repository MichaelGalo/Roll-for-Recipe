import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../firebase";
import "../auth/Login.css";
import { useState } from "react";

export const FirebaseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error during email login:", error);
      window.alert("Invalid login");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      window.alert("Google sign-in failed");
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
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
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
                onChange={(e) => setPassword(e.target.value)}
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
          <fieldset className="auth-fieldset">
            <div>
              <button type="button" onClick={handleGoogleSignIn}>
                Sign in with Google
              </button>
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

