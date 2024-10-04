import { fetchWithAuth } from "./fetcher";


export const getAllRecipes = async () => {
  const response = await fetchWithAuth("http://localhost:8000/recipes");
  return response.json();
};


export const getRecipesByUserId = async (userId) => {
  return await fetchWithAuth(
    `http://localhost:8000/recipes?userId=${userId}`
  ).then((res) => res.json());
};


export const getRecipeById = async (id) => {
  return await fetchWithAuth(
    `http://localhost:8000/recipes/${id}`
  ).then((res) => res.json());
};

export const updateRecipe = async (recipe) => {
  return await fetchWithAuth(`http://localhost:8000/recipes/${recipe.id}`, {
    method: "PUT",
    body: JSON.stringify(recipe),
  }).then((res) => res.json());
};

export const addRecipe = async (recipe) => {
  const response = await fetchWithAuth("http://localhost:8000/recipes", {
    method: "POST",
    body: JSON.stringify(recipe),
  });
  const data = await response.json();
  return data.id;
};

export const addIngredients = async (recipeId, ingredients) => {
  const formattedIngredients = ingredients
    .filter((ingredient) => ingredient.ingredientId && ingredient.quantity)
    .map((ingredient) => ({
      ingredient_id: parseInt(ingredient.ingredientId),
      recipe_id: recipeId,
      quantity: parseInt(ingredient.quantity, 10) || 0,
    }));

  const promises = formattedIngredients.map((ingredient) =>
    fetchWithAuth(`http://localhost:8000/ingredient_for_recipes`, {
      method: "POST",
      body: JSON.stringify(ingredient),
    })
  );

  const responses = await Promise.all(promises);
  return Promise.all(responses.map((response) => response.json()));
};

export const getIngredientsForRecipe = async (recipeId) => {
  const response = await fetchWithAuth(
    `http://localhost:8000/ingredient_for_recipes?recipe_id=${recipeId}&_expand=ingredient`
  );
  return response.json();
};

export const deleteRecipe = async (id) => {
  try {
    const ingredients = await getIngredientsForRecipe(id);
    const deletePromises = ingredients.map((ingredient) =>
      fetchWithAuth(`http://localhost:8000/ingredient_for_recipes/${ingredient.id}`, {
        method: "DELETE",
      })
    );
    await Promise.all(deletePromises);

    const recipeResponse = await fetchWithAuth(`http://localhost:8000/recipes/${id}`, {
      method: "DELETE",
    });

    if (!recipeResponse.ok) {
      const errorData = await recipeResponse.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete recipe");
    }

    return true;

  } catch (error) {
    console.error("Error in deleteRecipe:", error);
    throw error; 
  }
};

export const getFavoriteAuthorMealsByUserId = async (userId) => {
  return await fetchWithAuth(
    `http://localhost:8000/recipes/favorites?userId=${userId}&authorFavorite=true`
  ).then((res) => res.json());
};

export const getFavoriteNonAuthorMealsByUserId = async (userId) => {
  return await fetchWithAuth(
    `http://localhost:8000/recipes/favorites?userId=${userId}`
  ).then((res) => res.json());
};

// FIXME: not returning ONLY the data for the specific recipe OR the userId
export const getRecipeLikesByRecipeIdAndUserId = async (recipeId, userId) => {
  return await fetchWithAuth(
    `http://localhost:8000/recipe_likes?recipeId=${recipeId}&userId=${userId}`
  ).then((res) => res.json());
};

export const likeRecipe = async (recipeId, userId) => {
  const newLike = await fetchWithAuth(`http://localhost:8000/recipe_likes`, {
    method: "POST",
    body: JSON.stringify({ recipe_Id: recipeId, user_Id: userId }),
  }).then((res) => res.json());

  const recipe = await getRecipeById(recipeId);
  const updatedRecipe = {
    ...recipe,
    favorites: (recipe.favorites || 0) + 1,
  };
  await updateRecipe(updatedRecipe);

  return newLike;
};

export const unlikeRecipe = async (likeId, recipeId) => {
  await fetchWithAuth(`http://localhost:8000/recipe_likes/${likeId}`, {
    method: "DELETE",
  });

  const recipe = await getRecipeById(recipeId);
  const updatedRecipe = {
    ...recipe,
    favorites: Math.max((recipe.favorites || 0) - 1, 0),
  };
  const result = await updateRecipe(updatedRecipe);

  return updatedRecipe;
};
