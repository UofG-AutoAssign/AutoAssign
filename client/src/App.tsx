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
import PreferencePage from "./pages/PreferencePage";
import HRManagePage from "./pages/HRManagePage";
import ManagerTeamPage from "./pages/ManagerTeamPage";
import ManagerPage from "./pages/ManagerPage";
import HRhomePage from "./pages/HRhomePage";
import themeStore from "./context/themeStore";
import { observer } from "mobx-react";
import SignUpPage from "./pages/SignUpPage";

const App: FC = observer(() => {
  // Implement routing later
  return (
    <div className={themeStore.isDarkMode ? "dark" : ""}>
      <div className="page-background dark:bg-gray-800 overflow-y-auto">
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/graduate" element={<GraduatePage />} />
            <Route path="/graduateTeamPage" element={<GraduateTeamPage />} />
            {/* <Route
          path="/graduate"
          element={
            <PrivateRoute component={<GraduatePage/>}>
              
            </PrivateRoute>
          }
        /> */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/hr" element={<HRhomePage />} />
            <Route path="/manager" element={<ManagerPage />} />
            <Route path="/managerTeam" element={<ManagerTeamPage />} />
            <Route path="/*" element={<NotFoundPage />} />
            <Route path="/forgot_password" element={<ForgotPassPage />} />
            <Route path="/preference_page" element={<PreferencePage />} />
            <Route path="/sign_up" element={<SignUpPage />} />
            <Route
              path="/hr_manage"
              element={<HRManagePage initialState={"Teams"} />}
            />
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  );
});

export default App;
