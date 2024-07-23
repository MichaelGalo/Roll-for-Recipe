import { Button } from "react-bootstrap";
import "./LikeButton.css";

// TODO: create likeRecipe function

export const LikeButton = ({ currentRecipe }) => {
  const toggleLike = () => {
    likeRecipe(currentRecipe.id);
  };

  return (
    <Button size="sm" className="like-button" onClick={toggleLike}>
      Like
    </Button>
  );
};
