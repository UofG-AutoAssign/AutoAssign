import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import GraduatePage from "./pages/GraduatePage";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import PrivateRoute from "./utility/PrivateRoute";
import AuthContextProvider from "./context/AuthContextProvider";
import HRhomePage from "./pages/HRhomePage";

const App: React.FC = () => {
  // Implement routing later
  return (
    <div className="bg-white">
      <AuthContextProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/graduate' element={<GraduatePage />}/>
        {/* <Route
          path="/graduate"
          element={
            <PrivateRoute component={<GraduatePage/>}>
              
            </PrivateRoute>
          }
        /> */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/HRhomePage" element={<HRhomePage/>} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/forgot_password" element={<ForgotPassPage />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
