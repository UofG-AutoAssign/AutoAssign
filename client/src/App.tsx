import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import GraduatePage from "./pages/GraduatePage";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  // Implement routing later
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/graduate" element={<GraduatePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
