export const LikeButton = ({ currentRecipe }) => {
  const toggleLike = () => {
    // likeRecipe(currentRecipe.id);
    console.log("Like Button Working");
  };

  return (
    <button className="like-button" onClick={toggleLike}>
      Like
    </button>
  );
};
