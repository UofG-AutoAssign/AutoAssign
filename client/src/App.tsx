import { FC } from "react";
import "./App.css";
import AccountPage from "./pages/AccountPage";
import GraduatePage from "./pages/GraduatePage";
import GraduateTeamPage from "./pages/GraduateTeamPage";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import HRManagePage from "./pages/HRManagePage";
import ManagerTeamPage from "./pages/ManagerTeamPage";
import ManagerPage from "./pages/ManagerHomePage";
import themeStore from "./context/themeStore";
import HRHomePage from "./pages/HRhomePage";
import { observer } from "mobx-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/RequireAuth";
import LandingPage from "./pages/LandingPage";

const App: FC = observer(() => {
  return (
    <div className={themeStore.isDarkMode ? "dark" : ""}>
      {/* <nav className="sticky top-0 z-50">
        <Navbar />
      </nav> */}
      <div className="page-background dark:bg-gray-800 overflow-y-auto">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage pageType="Login"/>} />
          <Route path="forgot_password" element={<LandingPage pageType="SendEmail"/>} />
          <Route path="/sign_up/:signUpToken" element={<LandingPage pageType="Signup"/>} />
          <Route path="/enter_new_password/:newPasswordToken" element={<LandingPage pageType="ResetPassword"/>} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Private Routes */}
          <Route element={<RequireAuth />}>
            {/* Not role-specific */}
            <Route path="account" element={<AccountPage />} />

            {/* Graduate Routes */}
            <Route path="graduate" element={<GraduatePage />} />
            <Route
              path="graduate/team"
              element={<GraduateTeamPage initialComponent="Your Team" />}
            />
            <Route
              path="graduate/team/view_team"
              element={<GraduateTeamPage initialComponent="Your Team" />}
            />
            <Route
              path="graduate/team/preference_form"
              element={<GraduateTeamPage initialComponent="Preference Form" />}
            />

            {/* HR Routes */}
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
              path="hr/manage/create_graduate_account"
              element={
                <HRManagePage initialState={"Create Graduate Account"} />
              }
            />
            <Route
              path="hr/manage/create_manager_account"
              element={<HRManagePage initialState={"Create Manager Account"} />}
            />
            <Route
              path="hr/manage/delete_team"
              element={<HRManagePage initialState={"Delete Team"} />}
            />
            <Route
              path="hr/manage/auto_assign"
              element={<HRManagePage initialState={"Delete Team"} />}
            />


            {/* Manager Routes */}
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
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </div>
  );
});

export default App;
