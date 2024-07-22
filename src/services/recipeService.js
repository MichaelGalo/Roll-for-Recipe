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

export const getRecipesByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=mealType`
  ).then((res) => res.json());
};

export const updateRecipe = async (recipe) => {
  return await fetch(`http://localhost:8088/recipes/${recipe.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};

export const addRecipe = async (recipe) => {
  return await fetch(`http://localhost:8088/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};

export const deleteRecipe = async (id) => {
  return await fetch(`http://localhost:8088/recipes/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

//TODO: consider removing due to DRY violation
export const getRecipeByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=mealTypes`
  ).then((res) => res.json());
};
