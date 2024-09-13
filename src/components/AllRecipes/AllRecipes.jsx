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

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorIds = recipes.map((recipe) => recipe.userId);
        const uniqueAuthorIds = [...new Set(authorIds)]; // Remove duplicates

        const authorDetailsPromises = uniqueAuthorIds.map((id) => {
          return getUserById(id);
        });

        const authorDetails = await Promise.all(authorDetailsPromises);

        const authorMap = authorDetails.reduce((acc, author) => {
          const authorId = author.id || author.userId; 
          acc[authorId] = author.displayName; // Use displayName instead of name
          return acc;
        }, {});
        setAuthors(authorMap);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
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
              <Link
                to={`/recipe-details/${recipe.id}`}
                className="recipe-title"
              >
                {recipe.title}
              </Link>{" "}
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


