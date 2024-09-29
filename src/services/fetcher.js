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
  

  // Client To-Dos:
  // TODO: refactor all service calls for Auth/NoAuth Fetches to the correct function. 
  // TODO: Restyle Register

  //API To-Dos:
  // Using the "Q" function, modify API endpoints to support expanded queries