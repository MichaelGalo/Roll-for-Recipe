// export fetch function to get all recipes
export const getAllRecipes = async () => {
  const response = await fetch("http://localhost:8088/recipes");
  const recipes = await response.json();
  return recipes;
};

export const getPostById = async (id) => {
  return await fetch(
    `http://localhost:8088/recipes/${id}?_expand=user&_expand=mealCategories`
  ).then((res) => res.json());
};

// need a PUT service to update the likes on the post
export const updatePost = async (post) => {
  return await fetch(`http://localhost:8088/recipes/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

// need a POST service to add a new post
export const addPost = async (post) => {
  return await fetch(`http://localhost:8088/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => res.json());
};

// need a DELETE service to delete a post
export const deletePost = async (id) => {
  return await fetch(`http://localhost:8088/recipes/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

// need a getPostByUserId service to get all recipes by a user
export const getPostByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=mealCategories`
  ).then((res) => res.json());
};
