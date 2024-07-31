import React, { createContext, useState, useContext } from "react";

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [selectedMeals, setSelectedMeals] = useState([]);

  const addMeal = (meal) => {
    setSelectedMeals((prevMeals) => [...prevMeals, meal]);
  };

  const removeMeal = (mealId) => {
    setSelectedMeals((prevMeals) =>
      prevMeals.filter((meal) => (meal.id || meal.recipeId) !== mealId)
    );
  };

  return (
    <MealContext.Provider value={{ selectedMeals, addMeal, removeMeal }}>
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => useContext(MealContext);
