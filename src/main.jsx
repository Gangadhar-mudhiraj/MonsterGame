import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { action as registerAction } from "./pages/Register/RegisterPage";
import { action as loginAction } from "./pages/Login/LoginPage";
import RootLayout from "./layout/RootLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import {
  // LoginPage,
  Question,
  // RegisterPage,
  NotFound,
  SingleQuestion,
  // RequireAuth,
  // RequireLogout,
  Success,
} from "./pages";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
// import { Carousel } from "./components/Carousel/index";
import { Summary } from "./pages/Summary/Summary";
import AddQuizData from "./components/AddQuestions/AddQuestions";
import MineYourAnswerGame from "./games/mineYourAnswer/src/MineYourAnswerGame"
import MonsterGame from "./games/MonsterGame/src/App"
import CatchApple from "./games/catchTheApple/src/CatchApple"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      {" "}
      {/*  Removed the error boundary */}
      {/* Routes */}
      {/* <Route element={<RequireLogout />}> */}
      {/* User Need to logout */}
      {/* <Route path="login" element={<LoginPage />} action={loginAction} /> */}
      {/* <Route
          path="register"
          element={<RegisterPage />}
          action={registerAction}
        />
      </Route> */}
      {/* <Route element={<RequireAuth />}> */}
      {/* User need to login */}
      <Route index element={<App />} />
      <Route path="question" element={<Question />} />{" "}
      {/* added the Carousel */}
      <Route
        path="questions/play"
        element={
          <ProtectedRoute>
            <SingleQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="mine-your-answer/play/*"
        element={
          <ProtectedRoute>
              <MineYourAnswerGame/>
          </ProtectedRoute>
        }
      />

      <Route 
        path="monstergame/*"
        element={
          <ProtectedRoute>
               <MonsterGame/>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/catch-the-apple/play/*"
        element={
          <ProtectedRoute>
               <CatchApple/>
          </ProtectedRoute>
        }
      />

      <Route path="finish" element={<Success />} />
      <Route path="watch" element={<Question />} />
      <Route path="summary" element={<Summary />} />
      {/* <Route path="questions/add" element={<AddQuizData />} /> */}
      {/* </Route> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
