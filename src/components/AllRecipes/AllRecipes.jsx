import { Container } from "react-bootstrap";
import "./AllRecipes.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";

export const AllRecipes = ({
  recipes,
  categories,
  getMealCategoryName,
  currentUser,
}) => {
  const [authors, setAuthors] = useState({});

  // must learn to understand this even more. Reduce is so strange, but works perfectly here.
  useEffect(() => {
    const fetchAuthors = async () => {
      const authorIds = recipes.map((recipe) => recipe.userId);
      const uniqueAuthorIds = [...new Set(authorIds)]; // Remove duplicates
      const authorDetailsPromises = uniqueAuthorIds.map((id) =>
        getUserById(id)
      );
      const authorDetails = await Promise.all(authorDetailsPromises);
      const authorMap = authorDetails.reduce((acc, author) => {
        acc[author.id] = author.name;
        return acc;
      }, {});
      setAuthors(authorMap);
    };

    if (recipes.length > 0) {
      fetchAuthors();
    }
  }, [recipes]);

  return (
    <Container className="recipe-card-background">
      <ul className="recipe-card">
        {recipes.map((recipe) => (
          <li className="recipe" key={recipe.id}>
            <h4>
              <span style={{ fontWeight: "bold" }}></span>{" "}
              <Link to={`/recipe-details/${recipe.id}`}>{recipe.title}</Link>{" "}
            </h4>
            <p>
              Cuisine:{" "}
              <span style={{ fontWeight: "bold" }}>
                {getMealCategoryName(recipe.mealTypeId)}
              </span>
            </p>
            <p>
              Author:{" "}
              <span style={{ fontStyle: "italic" }}>
                {authors[recipe.userId] || "Loading..."}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Container>
  );
};

//TODO: number of favorites to track below the author after social stretch goal begins
