import { fetchWithAuth } from "./fetcher";
import { getIngredientsForRecipe } from "./recipeService";

export const fetchIngredients = async () => {
  const response = await fetchWithAuth(`${baseUrl}/ingredients`);
  return response.json();
};

export const updateIngredientsForRecipe = async (recipeId, ingredients) => {
  const validIngredients = ingredients.filter(
    (ingredient) => ingredient.ingredient_Id && ingredient.quantity
  );

  const existingIngredients = await getIngredientsForRecipe(recipeId);

  const deletePromises = existingIngredients
    .filter(
      (existingIngredient) =>
        !validIngredients.some(
          (ingredient) => ingredient.id === existingIngredient.id
        )
    )
    .map((ingredient) => {
      return fetchWithAuth(
        `${baseUrl}/ingredient_for_recipes/${ingredient.id}`,
        {
          method: "DELETE",
        }
      ).catch(error => {
        console.error(`Failed to delete ingredient ${ingredient.id}:`, error);
        return null;
      });
    });

  await Promise.all(deletePromises);

  const updatePromises = validIngredients.map((ingredient) => {
    const body = JSON.stringify({
      ingredient_id: parseInt(ingredient.ingredient_Id, 10),
      recipe_id: parseInt(recipeId, 10),
      quantity: parseInt(ingredient.quantity, 10),
    });

    if (ingredient.id) {
      return fetchWithAuth(
        `${baseUrl}/ingredient_for_recipes/${ingredient.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      ).then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Failed to update ingredient ${ingredient.id}: ${response.status} ${response.statusText}\n${text}`);
          });
        }
        return { status: 'updated', id: ingredient.id };
      });
    } else {
      return fetchWithAuth(`${baseUrl}/ingredient_for_recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }).then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Failed to create ingredient: ${response.status} ${response.statusText}\n${text}`);
          });
        }
        return response.json();
      });
    }
  });

  try {
    const responses = await Promise.all(updatePromises);
    return responses;
  } catch (error) {
    console.error("Error updating ingredients:", error);
    throw error;
  }
};

export const fetchGrocerySubtypeNames = async (subtypeIds) => {
  const subtypePromises = subtypeIds.map((id) =>
    fetchWithAuth(`${baseUrl}/grocery_subtypes/${id}`).then((response) =>
      response.json()
    )
  );
  const subtypes = await Promise.all(subtypePromises);
  return subtypes.reduce((acc, subtype) => {
    acc[subtype.id] = subtype.name;
    return acc;
  }, {});
};