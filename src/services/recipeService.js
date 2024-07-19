// export fetch function to get all recipes
export const getAllRecipes = async () => {
  const response = await fetch("http://localhost:8088/recipes");
  const recipes = await response.json();
  return recipes;
};

export const getRecipeById = async (id) => {
  return await fetch(
    `http://localhost:8088/recipes/${id}?_expand=user&_expand=mealType`
  ).then((res) => res.json());
};

// export function to get recipes by the currentUser.id
export const getRecipesByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=mealType`
  ).then((res) => res.json());
};

// need a PUT service to update the likes on the recipe
export const updateRecipe = async (recipe) => {
  return await fetch(`http://localhost:8088/recipes/${recipe.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};

// need a POST service to add a new recipe
export const addRecipe = async (recipe) => {
  return await fetch(`http://localhost:8088/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};

// need a DELETE service to delete a post
export const deleteRecipe = async (id) => {
  return await fetch(`http://localhost:8088/recipes/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

// need a getRecipeByUserId service to get all recipes by a user
export const getRecipeByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=mealTypes`
  ).then((res) => res.json());
};

// favorites will need to be handled a little differently, since they will be booleans instead of a bridge table until I add the social component.
