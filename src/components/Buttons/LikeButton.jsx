import { Button } from "react-bootstrap";
import "./LikeButton.css";
import {
  likeRecipe,
  unlikeRecipe,
  checkRecipeLike
} from "../../services/recipeService";
import { useEffect, useState } from "react";

export const LikeButton = ({ currentRecipe, currentUser }) => {
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (currentRecipe?.id && currentUser?.id) {
        setIsLoading(true);
        try {
          const { isLiked, likeId } = await checkRecipeLike(currentRecipe.id, currentUser.id);
          setLiked(isLiked);
          setLikeId(likeId);
        } catch (error) {
          console.error("Error checking like status:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchLikeStatus();
  }, [currentRecipe?.id, currentUser?.id]);

  const toggleLike = async () => {
    if (isLoading || !currentRecipe?.id || !currentUser?.id) return;
    
    setIsLoading(true);
    try {
      if (liked) {
        if (likeId) {
          await unlikeRecipe(likeId, currentRecipe.id);
          setLikeId(null);
        } else {
          throw new Error("Like ID not found");
        }
      } else {
        const newLike = await likeRecipe(currentRecipe.id, currentUser.id);
        setLikeId(newLike.id);
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("Failed to update like status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentRecipe?.id || !currentUser?.id) {
    return null; // Don't render the button if we don't have the necessary data
  }

  return (
    <Button
      size="sm"
      className={`like-button ${liked ? "liked" : ""}`}
      onClick={toggleLike}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : (liked ? "Liked" : "Like")}
    </Button>
  );
};