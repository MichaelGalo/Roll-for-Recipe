import { baseUrl, fetchWithAuth, fetchWithoutAuth } from "./fetcher";

export const getUserByEmail = async (email) => {
  return await fetchWithoutAuth(`${baseUrl}/users/?search=${email}`)
    .then(res => res.json());
};

export const getUserById = async (id) => {
  return await fetchWithAuth(`${baseUrl}/users/${id}`)
    .then(res => res.json());
};

export const updateUser = async (user) => {
  return await fetchWithAuth(`${baseUrl}/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify(user),
  }).then(res => res.json());
};

export const loginUser = (username, password) => {
  return fetchWithoutAuth(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password })
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        throw new Error(err.message || 'Login failed');
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.token) {
      localStorage.setItem("recipe_token", data.token);
      localStorage.setItem("recipe_user", JSON.stringify({
        id: data.user_id,
        username: data.username
      }));
    } else {
      throw new Error('No token received');
    }
    return data;
  });
};

export const createUser = (user) => {
  return fetchWithoutAuth(`${baseUrl}/register`, {
    method: "POST",
    body: JSON.stringify(user)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        throw new Error(err.message || 'Registration failed');
      });
    }
    return response.json();
  })
  .then(data => {
    if (data.token) {
      localStorage.setItem("recipe_token", data.token);
      if (data.user_id && data.username) {
        localStorage.setItem("recipe_user", JSON.stringify({
          id: data.user_id,
          username: data.username
        }));
      }
    } else {
      throw new Error('Registration successful but no token received');
    }
    return data;
  });
};