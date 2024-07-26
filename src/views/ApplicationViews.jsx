import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Welcome } from "../components/Welcome/Welcome";
import { NavBar } from "../components/NavBar/NavBar";
import { AllRecipesList } from "../components/AllRecipes/AllRecipesList";
import { NewRecipe } from "../components/NewRecipe/NewRecipe";
import { MyRecipes } from "../components/MyRecipes/MyRecipes";
import { RecipeDetails } from "../components/RecipeDetails/RecipeDetails";
import { EditRecipe } from "../components/EditRecipe/EditRecipe";
import { RollForRecipe } from "../components/RollForRecipe/RollForRecipe";
import { Favorites } from "../components/Favorites/Favorites";
import { Profile } from "../components/Profile/Profile";
import { EditProfile } from "../components/EditProfile/EditProfile";

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
          element={<RecipeDetails currentUser={currentUser} />}
        />
        <Route
          path="new-recipe"
          element={<NewRecipe currentUser={currentUser} />}
        />
        <Route
          path="my-recipes"
          element={<MyRecipes currentUser={currentUser} />}
        />
        <Route
          path="edit-recipe/:recipeId"
          element={<EditRecipe currentUser={currentUser} />}
        />
        <Route
          path="favorites"
          element={<Favorites currentUser={currentUser} />}
        />
        <Route
          path="profile/:userId"
          element={<Profile currentUser={currentUser} />}
        />
        <Route
          path="edit-profile/:userId"
          element={<EditProfile currentUser={currentUser} />}
        />
        <Route
          path="roll-for-recipe"
          element={<RollForRecipe currentUser={currentUser} />}
        />
        <Route
          path="shopping-list"
          element={<div>Shopping List under construction</div>}
        />
      </Route>
    </Routes>
  );
};

// TODO: Shopping List
