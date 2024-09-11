import { useState } from 'react';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from "../../../firebase";
import { useFirebase } from "../../services/firebaseService"
import "../auth/Login.css"

export const FirebaseRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addData } = useFirebase();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await addData(`users/${user.uid}`, { email: user.email, displayName: user.displayName });
      alert('Google sign-in successful');
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      alert('Google sign-in failed');
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addData(`users/${user.uid}`, { 
        email: user.email,
        firstName: firstName,
        lastName: lastName
      });
      alert('Email sign-up successful');
      // TODO: need to redirect to the home page if succesful
    } catch (error) {
      console.error('Error during email sign-up:', error);
      alert('Email sign-up failed');
    }
  };

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleEmailSignUp}>
      <h1 className="header">Roll for Recipe</h1>
        <h2>Register</h2>
        <fieldset>
          <legend>Sign up with Email</legend>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="auth-button">Sign Up</button>
        </fieldset>
      </form>
        <h2>OR</h2>
        <button type="button" onClick={handleGoogleSignIn} className="auth-button">Sign in with Google</button>
    </main>
  );
};