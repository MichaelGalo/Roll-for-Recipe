export const isAuthenticated = () => {
  return localStorage.getItem("recipe_token") !== null;
};

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem("recipe_token"));
};
