import React, { useEffect, useState } from "react";
import "./MyRecipes.css";
import { getRecipesByUserId } from "../../services/recipeService";
import { DeleteButton } from "../Buttons/DeleteButton";
import { Col, Container, Row, Card } from "react-bootstrap";

//TODO: this function will likely need to be moved to the recipe details page
const formatRecipeBody = (body) => {
  return body
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>); // because react requires a unique key for each element in a list, this map is to render the different paragraphs in the body of the recipe
};

export const MyRecipes = ({ currentUser }) => {
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const recipesData = await getRecipesByUserId(currentUser.id);
      setMyRecipes(recipesData);
    };
    fetchMyPosts();
  }, [currentUser.id, myRecipes]);

  return (
    <Container className="MyRecipes mt-5">
      <Row>
        <Col>
          <h2>My Recipes</h2>
        </Col>
      </Row>
      {myRecipes.map((recipe) => (
        <Row key={recipe.id} className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>Cuisine: {recipe.mealType?.name}</Card.Text>
                <Card.Text>Author: {recipe.user.name}</Card.Text>
                <Card.Text>Number of Favorites: {recipe.favorites}</Card.Text>
                <Card.Text>Created: {recipe.date}</Card.Text>
                {/* <div className="recipe-body">
                  {formatRecipeBody(recipe.body)}
                </div> */}
                <DeleteButton currentRecipe={recipe} />
                {/* <EditButton currentUser={currentUser} currentRecipe={recipe} /> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

//TODO: instead of rendering the instructions on this page, create a link in the title to the recipe details page
// TODO: add an edit button to each recipe card that will take the user to the edit recipe page
