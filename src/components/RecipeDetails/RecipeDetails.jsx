import { useParams, Link } from "react-router-dom"; // Added Link import
import { useEffect, useState } from "react";
import { getRecipeById } from "../../services/recipeService";
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

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeData = await getRecipeById(recipeId);
      setCurrentRecipe(recipeData);
    };
    fetchRecipe();
  }, [recipeId]);

  return (
    <Container className="recipe-details">
      <Row>
        <Col>
          <h2>{currentRecipe.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col className="recipe-meta">
          <p>
            By:{" "}
            <Link to={`/profile/${currentRecipe.user?.id}`}>
              {currentRecipe.user
                ? currentRecipe.user.name
                : "Loading author..."}
            </Link>
          </p>
          <p>Published: {currentRecipe.date}</p>
          <p>
            Topic:{" "}
            {currentRecipe.mealType
              ? currentRecipe.mealType.name
              : "Loading cuisine type..."}
          </p>
          {currentRecipe.favorites !== undefined && (
            <p>Favorites: {currentRecipe.favorites}</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="recipe-content">
            {currentRecipe.body ? formatRecipeBody(currentRecipe.body) : ""}
          </div>
        </Col>
      </Row>
      <Row className="button-container">
        {currentUser.id !== currentRecipe.userId && (
          <LikeButton currentRecipe={currentRecipe} currentUser={currentUser} />
        )}{" "}
        {currentUser.id === currentRecipe.userId && (
          <EditButton currentUser={currentUser} currentRecipe={currentRecipe} />
        )}
        {currentUser.id === currentRecipe.userId && (
          <DeleteButton
            currentUser={currentUser}
            currentRecipe={currentRecipe}
          />
        )}
      </Row>
    </Container>
  );
};
