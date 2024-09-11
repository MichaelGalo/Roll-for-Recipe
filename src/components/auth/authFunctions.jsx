import { useNavigate } from "react-router-dom";

export const isAuthenticated = () => {
  return localStorage.getItem("recipe_token") !== null;
};

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("recipe_token"));
};

export const handleLogout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("recipe_token");
  localStorage.removeItem("user");
  localStorage.removeItem("firebase:host:roll-for-recipe-default-rtdb.firebaseio.com");
  navigate("/login", { replace: true });
};
