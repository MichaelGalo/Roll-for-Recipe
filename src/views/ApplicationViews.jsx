// this is the primary module where I will route my application

import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Welcome } from "../components/Welcome/Welcome";
import { NavBar } from "../components/NavBar/NavBar";
import { AllRecipesList } from "../components/AllRecipes/AllRecipesList";
import { NewRecipe } from "../components/NewRecipe/NewRecipe";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localRecipeUser = localStorage.getItem("recipe_token");
    setCurrentUser(JSON.parse(localRecipeUser));
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {<NavBar currentUser={currentUser} />}
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="all-recipes"
          element={<AllRecipesList currentUser={currentUser} />}
        />
        <Route
          path="recipe-details/:recipeId"
          element={<div>Recipe Details</div>}
        />
        <Route
          path="new-recipe"
          element={<NewRecipe currentUser={currentUser} />}
        />
        <Route path="my-recipes" element={<div>My Recipes</div>} />
        <Route path="edit-recipe/:recipeId" element={<div>Edit Recipe</div>} />
        <Route path="favorites" element={<div>Favorites</div>} />
        <Route path="profile/:userId" element={<div>Profile</div>} />
        <Route path="edit-profile/:userId" element={<div>Edit Profile</div>} />
        <Route path="roll-for-recipe" element={<div>Roll for Recipe</div>} />
        <Route path="shopping-list" element={<div>Shopping List</div>} />
      </Route>
    </Routes>
  );
};

// TODO:  New Recipe
//
// Recipe Details
// My Recipes
// Edit Recipe
// Favorites
// Profile
// Edit Profile
// Roll for Recipe
// Shopping List
