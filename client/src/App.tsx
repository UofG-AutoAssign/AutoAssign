import { FC } from "react";
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
import themeStore from "./context/themeStore";
import { observer } from "mobx-react";
import SignUpPage from "./pages/SignUpPage";
import HRHomePage from "./pages/HRhomePage";

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
            <Route path="hr" element={<HRHomePage />} />
            <Route
              path="hr/manage/"
              element={<HRManagePage initialState={"Teams"} />}
            />
            <Route
              path="hr/manage/manage_team"
              element={<HRManagePage initialState={"Teams"} />}
            />
            <Route
              path="hr/manage/assign_graduate"
              element={<HRManagePage initialState={"Assign Graduate"} />}
            />
            <Route
              path="hr/manage/remove_graduate"
              element={<HRManagePage initialState={"Remove Graduate"} />}
            />
            <Route
              path="hr/manage/assign_manager"
              element={<HRManagePage initialState={"Assign Manager"} />}
            />
            <Route
              path="hr/manage/remove_manager"
              element={<HRManagePage initialState={"Remove Manager"} />}
            />
            <Route
              path="hr/manage/create_account"
              element={<HRManagePage initialState={"Create Account"} />}
            />
            <Route path="manager" element={<ManagerPage />} />
            <Route
              path="manager/team/"
              element={<ManagerTeamPage initialState={"Your Team"} />}
            />
            <Route
              path="manager/team/view_team"
              element={<ManagerTeamPage initialState={"Your Team"} />}
            />
            <Route
              path="manager/team/team_preference"
              element={<ManagerTeamPage initialState={"Team Preference"} />}
            />
            <Route path="forgot_password" element={<ForgotPassPage />} />
            <Route path="/sign_up" element={<SignUpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthContextProvider>
      </div>
    </div>
  );
});

export default App;
