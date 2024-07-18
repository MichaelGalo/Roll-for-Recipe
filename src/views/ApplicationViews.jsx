// this is the primary module where I will route my application

import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Welcome } from "../components/Welcome/Welcome";
import { NavBar } from "../components/NavBar/NavBar";

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
        <Route path="all-recipes" element={<div>All Recipes</div>} />
        <Route
          path="recipe-details/:recipeId"
          element={<div>Recipe Details</div>}
        />
        <Route path="new-recipe" element={<div>New Recipe</div>} />
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

// Here are the Routes I Need

// All Recipes
// Recipe Details
// New Recipe
// My Recipes
// Edit Recipe
// Favorites
// Profile
// Edit Profile
// Roll for Recipe
// Shopping List

// TODO: NavBar
