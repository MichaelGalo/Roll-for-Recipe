// this module is where I need to set up my routes for login, register, and *
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { MealProvider } from "./components/Context/MealContext";

export const App = () => {
  return (
    <MealProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Authorized>
              <ApplicationViews />
            </Authorized>
          }
        />
      </Routes>
    </MealProvider>
  );
};
