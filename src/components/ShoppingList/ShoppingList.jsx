import "./ShoppingList.css";
import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useMealContext } from "../Context/MealContext";
import { getIngredientsForRecipe } from "../../services/recipeService";

export const ShoppingList = () => {
  const { selectedMeals } = useMealContext();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      // Create an array of promises where each promise fetches the ingredients for a selected meal
      const ingredientsPromises = selectedMeals.map((meal) =>
        getIngredientsForRecipe(meal.id)
      );

      // Wait for all promises to resolve. This will result in an array of arrays of ingredients.
      const ingredientsArrays = await Promise.all(ingredientsPromises);

      // Flatten the array of arrays into a single array of ingredients
      const allIngredients = ingredientsArrays.flat();

      // Combine ingredients based on their names and sum their quantities
      const combinedIngredients = allIngredients.reduce((acc, ingredient) => {
        // Check if the ingredient already exists in the accumulator array
        const existingIngredient = acc.find(
          (i) => i.ingredient.name === ingredient.ingredient.name
        );

        if (existingIngredient) {
          // If the ingredient exists, increment the quantity
          existingIngredient.quantity += ingredient.quantity;
        } else {
          // If the ingredient does not exist, add it to the accumulator array
          acc.push({ ...ingredient });
        }

        // Return the accumulator array for the next iteration
        return acc;
      }, []);
      setIngredients(combinedIngredients);
    };
    fetchIngredients();
  }, [selectedMeals]);

  return (
    <div>
      <h2>Shopping List</h2>
      <ListGroup>
        {ingredients.map((ingredient, index) => (
          <ListGroup.Item key={index}>
            {ingredient.quantity} {ingredient.ingredient.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

// {ingredient.unit} could be a useful bit of info
