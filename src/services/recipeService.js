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

// export function to grab the favorite authored meals by user id
export const getFavoriteAuthorMealsByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/recipes?userId=${userId}&authorFavorite=true&_expand=user&_expand=mealType`
  ).then((res) => res.json());
};
// export function to grab the favorite non-author meals by user id
export const getFavoriteNonAuthorMealsByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/recipeLikes?userId=${userId}&_expand=recipe`
  ).then((res) => res.json());
};

// export function to get recipeLikes by recipeId and userId
export const getRecipeLikesByRecipeIdAndUserId = async (recipeId, userId) => {
  return await fetch(
    `http://localhost:8088/recipeLikes?recipeId=${recipeId}&userId=${userId}`
  ).then((res) => res.json());
};

// export function to get recipeLikes by recipeId
export const likeRecipe = async (recipeId, userId) => {
  // First, create the like
  const newLike = await fetch(`http://localhost:8088/recipeLikes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recipeId, userId }),
  }).then((res) => res.json());
  // Then, get the current recipe
  const recipe = await getRecipeById(recipeId);
  // Update the recipe's favorites count
  const updatedRecipe = {
    ...recipe,
    favorites: (recipe.favorites || 0) + 1,
  };
  // Save the updated recipe
  await updateRecipe(updatedRecipe);

  return newLike;
};

// export function to unlike a recipe
export const unlikeRecipe = async (likeId, recipeId) => {
  // First, delete the like
  await fetch(`http://localhost:8088/recipeLikes/${likeId}`, {
    method: "DELETE",
  });
  // Then, get the current recipe
  const recipe = await getRecipeById(recipeId);
  // Update the recipe's favorites count
  const updatedRecipe = {
    ...recipe,
    favorites: Math.max((recipe.favorites || 0) - 1, 0), // Ensure it doesn't go below 0
  };
  // Save the updated recipe
  const result = await updateRecipe(updatedRecipe);

  return updatedRecipe;
};
