import Button from "react-bootstrap/Button";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <img src="src/assets/Chef.png" alt="chef" />
      <h1>Welcome to Roll for Recipe!</h1>
      <h2>Save your favorite recipes to roll for a random recipe each week!</h2>
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
