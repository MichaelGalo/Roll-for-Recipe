import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getIngredientsForRecipe,
  getRecipeById,
} from "../../services/recipeService";
import "./RecipeDetails.css";
import { LikeButton } from "../Buttons/LikeButton";
import { EditButton } from "../Buttons/EditButton";
import { DeleteButton } from "../Buttons/DeleteButton";
import { Button, Col, Container, Row } from "react-bootstrap";

const formatRecipeBody = (body) => {
  return body
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>); // because react requires a unique key for each element in a list, this map is to render the different paragraphs in the body of the recipe
};

export const RecipeDetails = ({ currentUser }) => {
  let { recipeId } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [recipesUpdated, setRecipesUpdated] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const handleRecipeUpdate = () => {
    setRecipesUpdated(!recipesUpdated);
  };

  useEffect(() => {
    const fetchData = async () => {
      const recipeData = await getRecipeById(parseInt(recipeId));
      setCurrentRecipe(recipeData);

      const ingredientsData = await getIngredientsForRecipe(parseInt(recipeId));
      setIngredients(ingredientsData);
    };
    fetchData();
  }, [recipeId, recipesUpdated]);


  return (
    <Container className="recipe-details">
      <Row>
        <Col>
          <h2>{currentRecipe.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col className="recipe-meta">
          <p>Published: {currentRecipe.date}</p>
          <p>
            <strong>Original Chef:</strong>{" "}
            <Link to={`/profile/${currentRecipe.user?.id}`}>
              {currentRecipe.user
                ? currentRecipe.user.username
                : "Loading author..."}
            </Link>
          </p>
          <p>
            <strong>Cuisine:</strong>{" "}
            {currentRecipe.meal_type
              ? currentRecipe.meal_type
              : "Loading cuisine type..."}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {currentRecipe.time
              ? currentRecipe.time
              : "No set prep time for this recipe"}
          </p>
          {/* Add favorites after implementing favorites state
          {currentRecipe.favorites !== undefined && (
            <p>
              <strong>How many others have favorited this meal:</strong>{" "}
              {currentRecipe.favorites}
            </p>
          )} */}
        </Col>
      </Row>
      <Row>
        <Col>
          {ingredients.length > 0 && (
            <div>
              <p>
                <strong>List of Ingredients:</strong>
              </p>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.ingredient.name}</li>
                ))}
              </ul>
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="recipe-content">
            <p>
              <strong>Instructions:</strong>
            </p>
            <ul>
              {currentRecipe.body ? formatRecipeBody(currentRecipe.body) : ""}
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="button-container">
        {currentUser.id !== currentRecipe.user?.id && (
          <LikeButton currentRecipe={currentRecipe} currentUser={currentUser} />
        )}{" "}
        {currentUser.id === currentRecipe.user?.id && (
          <EditButton
            currentUser={currentUser}
            currentRecipe={currentRecipe}
            handleRecipeUpdate={handleRecipeUpdate}
          />
        )}
        {currentUser.id === currentRecipe.user?.id && (
          <DeleteButton
            currentUser={currentUser}
            currentRecipe={currentRecipe}
            handleRecipeUpdate={handleRecipeUpdate}
          />
        )}
      </Row>
    </Container>
  );
};
