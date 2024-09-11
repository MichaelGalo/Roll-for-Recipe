// import { Navigate, useLocation } from "react-router-dom";

// // We can access child components the same way we access props. Child components are passed to our props as a key/value pair where
// // children is the key.

// export const Authorized = ({ children }) => {
//   let location = useLocation();

//   // Check if user is logged in. If they are, render the CHILD components (in this case, the ApplicationViews component)
//   if (localStorage.getItem("recipe_token")) {
//     return children;
//   }
//   // If the user is NOT logged in, redirect them to the login page using the Navigate component from react-router-dom
//   else {
//     return <Navigate to={`/login`} state={{ from: location }} replace />;
//   }
// };


////////////////////////////////
// change for firebase authentication
////////////////////////////////

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase"
import { Navigate } from "react-router-dom";

export const Authorized = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);

        localStorage.setItem(
          "recipe_token",
          JSON.stringify({
            id: user.uid,
          })
        );
      } else {
        setIsAuthenticated(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};