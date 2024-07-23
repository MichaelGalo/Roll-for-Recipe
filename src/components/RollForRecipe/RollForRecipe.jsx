import { useEffect, useState } from "react";
import "./RollForRecipe.css";
import { getFavoriteMealsByUserId } from "../../services/recipeService";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export const RollForRecipe = ({ currentUser }) => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [numberOfMealsToRandomize, setNumberOfMealsToRandomize] = useState(0);
  const [randomizedMeals, setRandomizedMeals] = useState([]);
  const [showRandomMeals, setShowRandomMeals] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const data = await getFavoriteMealsByUserId(currentUser.id);
      setFavoriteMeals(data);
    };
    fetchMeals();
  }, [currentUser]);

  const randomizeMeals = () => {
    let tempRandomMeals = [];
    for (let i = 0; i < numberOfMealsToRandomize; i++) {
      tempRandomMeals.push(
        favoriteMeals[Math.floor(Math.random() * favoriteMeals.length)]
      );
    }
    setRandomizedMeals(tempRandomMeals);
  };

  const handleShowMeals = () => {
    randomizeMeals();
    setShowRandomMeals(true);
  };

  const RandomMeals = ({ meals }) => (
    <div className="random-meals-container">
      {meals.map((meal) => (
        <div className="random-meal" key={meal.id}>
          <h3>
            <a href={`/recipe-details/${meal.id}`}>{meal.title}</a>
          </h3>
          <p>{meal.body}</p>
        </div>
      ))}
    </div>
  );

  return (
    <Container>
      <Row
        className="justify-content-md-center align-items-center"
        style={{ minHeight: "25vh" }}
      >
        <Col xs={12} md={6}>
          <Form className="d-flex flex-column">
            <Form.Group>
              <Form.Label className="form-title">
                <h1>Time to Roll-for-Recipe!</h1>
                <h2>How many meals do you want to roll for?</h2>
              </Form.Label>
              <Form.Select
                onChange={(e) =>
                  setNumberOfMealsToRandomize(Number(e.target.value))
                }
              >
                <option>Select Here</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </Form.Select>
            </Form.Group>
            <div className="mt-auto d-flex justify-content-center">
              <Button onClick={handleShowMeals}>Roll!</Button>
            </div>
          </Form>
        </Col>
      </Row>
      {showRandomMeals && (
        <Row className="mt-4">
          <Col>
            <RandomMeals meals={randomizedMeals} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

//TODO: Hotfix that they all need to be unique meals -- turn into a set
