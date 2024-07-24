import { useEffect, useState } from "react";
import "./Favorites.css";
import {
  getFavoriteAuthorMealsByUserId,
  getFavoriteNonAuthorMealsByUserId,
} from "../../services/recipeService";
import { Link } from "react-router-dom";

export const Favorites = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      let totalFavorites = [];

      const authorFavorites = await getFavoriteAuthorMealsByUserId(
        currentUser.id
      );
      const nonAuthorFavorites = await getFavoriteNonAuthorMealsByUserId(
        currentUser.id
      );
      totalFavorites = authorFavorites.concat(nonAuthorFavorites);
      setFavorites(totalFavorites);
    };

    fetchFavorites();
  }, [currentUser.id]);

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favorites.map((favorite) => (
        <div key={favorite.id} className="recipe">
          <h3>
            <Link to={`/recipe-details/${favorite.recipeId || favorite.id}`}>
              {favorite.recipe?.title || favorite.title}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
};
