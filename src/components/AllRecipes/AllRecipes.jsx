import { Container } from "react-bootstrap";
import "./AllRecipes.css";
import { Link } from "react-router-dom";

export const AllRecipes = ({
  recipes,
  categories,
  getMealCategoryName,
  currentUser,
}) => {
  return (
    <Container className="recipe-card-background">
      <ul className="recipe-card">
        {recipes.map((recipe) => (
          <li className="recipe" key={recipe.id}>
            <h3>
              <span style={{ fontWeight: "bold" }}></span>{" "}
              <Link to={`/recipe-details/${recipe.id}`}>{recipe.title}</Link>{" "}
            </h3>
            <p>
              Cuisine:{" "}
              <span style={{ fontWeight: "bold" }}>
                {getMealCategoryName(recipe.categoryId)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
};
