import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { MealProvider } from "./components/Context/MealContext";
import { FirebaseRegister } from "./components/Authentication/FirebaseRegister";
import { FirebaseLogin } from "./components/Authentication/FirebaseLogin";

export const App = () => {
  return (
    <MealProvider>
      <Routes>
        <Route path="/login" element={<FirebaseLogin />} />
        <Route path="/register" element={<>  <FirebaseRegister/> </>} />
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


// unused Original <Register /> component
// unused Original <Login /> component