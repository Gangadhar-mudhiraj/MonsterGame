// src/App.tsx
import React from "react";
import MonsterQuizPage from "./Pages/QuizPage.tsx";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="monsterGame-container m-auto h-screen xl:w-96 sm:w-96 md:w-96 bg-customPurple">
      <MonsterQuizPage />
    </div>
  );
};

export default App;
