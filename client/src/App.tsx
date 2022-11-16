import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {

  // Implement routing later
  return (
    <div className="bg-white">
      <AccountPage />
    </div>
  );
};

export default App;
