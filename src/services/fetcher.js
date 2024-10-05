// Centralized fetch functions
export const fetchWithAuth = (url, options = {}) => {
    const token = localStorage.getItem("recipe_token");
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json"
      }
    });
  };
  
export const fetchWithoutAuth = (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json"
      }
    });
  };
