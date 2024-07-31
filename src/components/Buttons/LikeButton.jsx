import { Button } from "react-bootstrap";
import "./LikeButton.css";
import {
  getRecipeLikesByRecipeIdAndUserId,
  likeRecipe,
  unlikeRecipe,
} from "../../services/recipeService";
import { useEffect, useState } from "react";

export const LikeButton = ({ currentRecipe, currentUser }) => {
  const [liked, setLiked] = useState(false);
  const [recipeLikes, setRecipeLikes] = useState([]);
  const [updatedRecipe, setUpdatedRecipe] = useState(currentRecipe);

  useEffect(() => {
    getRecipeLikesByRecipeIdAndUserId(currentRecipe.id, currentUser.id).then(
      (likes) => {
        setRecipeLikes(likes);
        setLiked(likes.some((like) => like.userId === currentUser.id));
      }
    );
  }, [currentRecipe, currentUser]);

  const toggleLike = () => {
    if (liked) {
      const like = recipeLikes.find(
        (like) =>
          like.userId === currentUser.id && like.recipeId === currentRecipe.id
      );
      if (like) {
        unlikeRecipe(like.id, currentRecipe.id).then(() => {
          setRecipeLikes((prevLikes) =>
            prevLikes.filter((l) => l.id !== like.id)
          );
          setLiked(false);
          setUpdatedRecipe((currentRecipe) => ({
            ...currentRecipe,
            favorites: currentRecipe.favorites - 1,
          }));
        });
      }
    } else {
      likeRecipe(currentRecipe.id, currentUser.id).then((newLike) => {
        setRecipeLikes((prevLikes) => [...prevLikes, newLike]);
        setLiked(true);
        setUpdatedRecipe((currentRecipe) => ({
          ...currentRecipe,
          favorites: currentRecipe.favorites + 1,
        }));
      });
    }
  };
  return (
    <Button
      size="sm"
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={toggleLike}
    >
      {liked ? "Liked" : "Like"}
    </Button>
  );
};
