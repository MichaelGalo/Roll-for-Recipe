// Centralized fetch functions
export const fetchWithAuth = (url, options = {}) => {
    const token = localStorage.getItem("token");
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
  // TODO: Refactor Register & Login for Django Authorization
  // TODO: refactor all service calls for Auth Fetches to the correct function. 
  // TODO: Restyle Login & Register