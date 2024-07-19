import React, { useEffect, useState } from "react";
import "./MyRecipes.css";
import { getRecipesByUserId } from "../../services/recipeService";
import { DeleteButton } from "../Buttons/DeleteButton";
import { EditButton } from "../Buttons/EditButton";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
                <Card.Title>
                  <Link to={`/recipe-details/${recipe.id}`}>
                    {recipe.title}
                  </Link>
                </Card.Title>
                <Card.Text>Cuisine: {recipe.mealType?.name}</Card.Text>
                <Card.Text>Author: {recipe.user.name}</Card.Text>
                <Card.Text>Number of Favorites: {recipe.favorites}</Card.Text>
                <Card.Text>Created: {recipe.date}</Card.Text>
                <DeleteButton currentRecipe={recipe} />{" "}
                <EditButton currentUser={currentUser} currentRecipe={recipe} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

// TODO: edit button still needs functionality
