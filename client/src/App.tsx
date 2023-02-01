import { FC, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import GraduatePage from "./pages/GraduatePage";
import GraduateTeamPage from "./pages/GraduateTeamPage";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import PrivateRoute from "./utility/PrivateRoute";
import AuthContextProvider from "./context/AuthContextProvider";
import HRManagePage from "./pages/HRManagePage";
import ManagerTeamPage from "./pages/ManagerTeamPage";
import ManagerPage from "./pages/ManagerHomePage";
import HRhomePage from "./pages/HRHomePage";
import themeStore from "./context/themeStore";
import { observer } from "mobx-react";
import Navbar from "./components/Navbar";

const App: FC = observer(() => {
  // Implement routing later
  return (
    <div className={themeStore.isDarkMode ? "dark" : ""}>
      {/* <nav className="sticky top-0 z-50">
        <Navbar />
      </nav> */}
      <div className="page-background dark:bg-gray-800 overflow-y-auto">
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="graduate" element={<GraduatePage />} />
            <Route path="graduate/team" element={<GraduateTeamPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="hr" element={<HRhomePage />} />
            <Route
              path="hr/manage"
              element={<HRManagePage initialState={"Teams"} />}
            />
            <Route path="manager" element={<ManagerPage />} />
            <Route path="manager/team" element={<ManagerTeamPage />} />
            <Route path="forgot_password" element={<ForgotPassPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  );
});

export default App;
