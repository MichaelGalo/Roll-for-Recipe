import "./ShoppingList.css";
import React, { useEffect, useState } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useMealContext } from "../Context/MealContext";
import { getIngredientsForRecipe } from "../../services/recipeService";
import { fetchGrocerySubtypeNames } from "../../services/ingredientsService";
import { Link } from "react-router-dom";

export const ShoppingList = () => {
  const { selectedMeals } = useMealContext();
  const [ingredients, setIngredients] = useState([]);
  const [grocerySubtypeNames, setGrocerySubtypeNames] = useState({});
  const [clickedItems, setClickedItems] = useState({});

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

      // Combine ingredients based on their names and their quantities
      const combinedIngredients = allIngredients.reduce((acc, ingredient) => {
        // Check if the ingredient already exists in the accumulator array
        const existingIngredient = acc.find(
          (i) => i.ingredient.name === ingredient.ingredient.name
        );

        if (existingIngredient) {
          existingIngredient.quantity += ingredient.quantity;
        } else {
          // If the ingredient does not exist, add it to the accumulator array
          acc.push({ ...ingredient });
        }
        return acc;
      }, []);
      setIngredients(combinedIngredients);
    };
    fetchIngredients();
  }, [selectedMeals]);

  useEffect(() => {
    const fetchAndSetGrocerySubtypeNames = async () => {
      const groceryCategories = ingredients.map(
        (ingredient) => ingredient.ingredient.grocerySubTypeId
      );
      const uniqueGroceryCategories = [...new Set(groceryCategories)];
      const subtypeNames = await fetchGrocerySubtypeNames(
        uniqueGroceryCategories
      );
      setGrocerySubtypeNames(subtypeNames);
    };

    if (ingredients.length > 0) {
      fetchAndSetGrocerySubtypeNames();
    }
  }, [ingredients]);

  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    const subtypeId = ingredient.ingredient.grocerySubTypeId;
    if (!acc[subtypeId]) {
      acc[subtypeId] = [];
    }
    acc[subtypeId].push(ingredient);
    return acc;
  }, {});

  const changeColor = (ingredientId) => {
    setClickedItems((prevClickedItems) => ({
      ...prevClickedItems,
      [ingredientId]: !prevClickedItems[ingredientId],
    }));
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Shopping List</h2>
        </Col>
      </Row>
      <Row className="my-4 ">
        <Col>
          <h4>Selected Meals</h4>
          <ListGroup>
            {selectedMeals.length === 0 ? (
              <ListGroup.Item className="selected-meals">
                No meals selected
              </ListGroup.Item>
            ) : (
              selectedMeals.map((meal) => (
                <ListGroup.Item key={meal.id} className="selected-meals">
                  <Link
                    className="selected-meals-link"
                    to={`/recipe-details/${meal.id}`}
                  >
                    {meal.title}
                  </Link>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <ListGroup>
            {ingredients.length === 0 ? (
              <ListGroup.Item className="text-center">
                No ingredients in shopping list, add some recipes to your list
                by rolling to get started!
              </ListGroup.Item>
            ) : (
              Object.keys(groupedIngredients).map((subtypeId) => (
                <div key={subtypeId} className="mb-4">
                  <h4>{grocerySubtypeNames[subtypeId]}</h4>
                  <ListGroup>
                    {groupedIngredients[subtypeId].map((ingredient, index) => (
                      <ListGroup.Item
                        key={index}
                        onClick={() => changeColor(ingredient.id)}
                        className={
                          clickedItems[ingredient.id] ? "selected-item" : ""
                        }
                      >
                        {ingredient.quantity} {ingredient.ingredient.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

// {ingredient.unit} could be a useful bit of info for a feature to add later
