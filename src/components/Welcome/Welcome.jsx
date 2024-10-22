import Button from "react-bootstrap/Button";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <img src="assets/Chef.png" alt="chef" />
      <h1>Welcome to Roll for Recipe!</h1>
      <h2>A social app for the home chef.</h2>
      <h3>
        Save & share your recipes, select your favorites, and roll for your
        weekly culinary challenge!
      </h3>
      <Button
        variant="secondary"
        onClick={() => {
          navigate("/roll-for-recipe");
        }}
        size="lg"
      >
        Let's Roll!
      </Button>
    </div>
  );
};
