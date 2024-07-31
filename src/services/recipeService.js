export const getAllRecipes = async () => {
  const response = await fetch("http://localhost:8088/recipes");
  const recipes = await response.json();
  return recipes;
};

export const getRecipesByUserId = async (userId) => {
  return await fetch(
    `http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=mealType`
  ).then((res) => res.json());
};

export const getRecipeById = async (id) => {
  return await fetch(
    `http://localhost:8088/recipes/${id}?_expand=user&_expand=mealType`
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
  const response = await fetch("http://localhost:8088/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  const data = await response.json();
  return data.id;
};

export const addIngredients = async (recipeId, ingredients) => {
  const formattedIngredients = ingredients
    .filter((ingredient) => ingredient.ingredientId && ingredient.quantity)
    .map((ingredient) => ({
      ingredientId: parseInt(ingredient.ingredientId),
      recipeId: recipeId,
      quantity: parseInt(ingredient.quantity, 10) || 0,
    }));

  const promises = formattedIngredients.map((ingredient) =>
    fetch(`http://localhost:8088/ingredientsForRecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingredient),
    })
  );

  const responses = await Promise.all(promises);
  return Promise.all(responses.map((response) => response.json()));
};

export const getIngredientsForRecipe = async (recipeId) => {
  const response = await fetch(
    `http://localhost:8088/ingredientsForRecipe?recipeId=${recipeId}&_expand=ingredient`
  );
  return response.json();
};

export const deleteRecipe = async (id) => {
  const ingredients = await getIngredientsForRecipe(id);
  const deletePromises = ingredients.map((ingredient) =>
    fetch(`http://localhost:8088/ingredientsForRecipe/${ingredient.id}`, {
      method: "DELETE",
    })
  );
  // Wait for all ingredient deletions to complete
  await Promise.all(deletePromises);

  const recipeResponse = await fetch(`http://localhost:8088/recipes/${id}`, {
    method: "DELETE",
  });

  return recipeResponse.json();
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
