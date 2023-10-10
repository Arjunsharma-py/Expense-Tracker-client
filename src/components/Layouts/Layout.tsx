import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "../Navbar/NavBar";
import AsidePanel from "../AsidePanel";
import DisplayContainer from "../DisplayContainer";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Assets from "../Assets/Assets";
import AddData from "../Add/AddData";
import DeleteData from "../Modify/DeleteData";
import EditData from "../Modify/EditData";
import Expenses from "../Expenses/Expenses";
import Starter from "../Guest/Starter";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import GuestNav from "../Guest/GuestNav";
import OtpVerify from "../Auth/OtpVerify";
import OrgDisplay from "../Org/OrgDisplay";
import OrgCreate from "../Org/OrgCreate";
import OrgJoin from "../Org/OrgJoin";
import AllManager from "../People/AllManager";
import AllEmployee from "../People/AllEmployee";
import EmployeeProfile from "../Profile/EmployeeProfile";
import ManagerProfile from "../Profile/ManagerProfile";
import OrganisationProfile from "../Profile/OrganisationProfile";
import Requests from "../Navbar/Requests";

const Layout = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Grid
        templateAreas={
          userContext.user && userContext.user.org
            ? {
                base: `"nav" "main" "footer"`,
                lg: `"nav nav" "aside main" "footer footer"`,
              }
            : {
                base: `"nav" "main" "footer"`,
                lg: `"nav" "main " "footer"`,
              }
        }
        templateColumns={
          userContext.user && userContext.user.org
            ? {
                base: "1fr",
                lg: "200px 1fr",
              }
            : {
                base: "1fr",
                lg: "1fr",
              }
        }
      >
        <GridItem area="nav">
          {userContext.user ? <NavBar /> : <GuestNav />}
        </GridItem>
        {userContext.user && userContext.user.org && (
          <Show above="lg">
            <GridItem area="aside">
              <AsidePanel />
            </GridItem>
          </Show>
        )}
        <GridItem area="main">
          <DisplayContainer>
            <Routes>
              <Route
                path="/"
                element={
                  userContext.user ? <Navigate to="/dash" /> : <Starter />
                }
              />
              <Route
                path="/auth/login"
                element={userContext.user ? <Navigate to="/dash" /> : <Login />}
              />
              <Route
                path="/auth/signup"
                element={
                  userContext.user ? <Navigate to="/dash" /> : <Signup />
                }
              />
              <Route
                path="/auth/verify"
                element={
                  userContext.user ? <Navigate to="/dash" /> : <OtpVerify />
                }
              />
              <Route
                path="/org"
                element={
                  userContext.user ? (
                    userContext.user.org ? (
                      <Navigate to="/dash" />
                    ) : (
                      <OrgDisplay />
                    )
                  ) : (
                    <Navigate to="auth/login" />
                  )
                }
              />
              <Route
                path="/org/create"
                element={
                  userContext.user ? (
                    userContext.user.org ? (
                      <Navigate to="/dash" />
                    ) : (
                      <OrgCreate />
                    )
                  ) : (
                    <Navigate to="auth/login" />
                  )
                }
              />
              <Route
                path="/org/join"
                element={
                  userContext.user ? (
                    userContext.user.org ? (
                      <Navigate to="/dash" />
                    ) : (
                      <OrgJoin />
                    )
                  ) : (
                    <Navigate to="auth/login" />
                  )
                }
              />
              <Route
                path="/dash"
                element={
                  userContext.user ? (
                    userContext.user.org ? (
                      <Dashboard />
                    ) : (
                      <Navigate to="/org" />
                    )
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/expenses"
                element={
                  userContext.user ? (
                    <Expenses />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/assets"
                element={
                  userContext.user ? <Assets /> : <Navigate to="/auth/login" />
                }
              />
              <Route
                path="/add"
                element={
                  userContext.user ? <AddData /> : <Navigate to="/auth/login" />
                }
              />
              <Route
                path="/del"
                element={
                  userContext.user ? (
                    <DeleteData />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/edit"
                element={
                  userContext.user ? (
                    <EditData />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/requests"
                element={
                  userContext.user ? (
                    <Requests smallDevice={true} />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/AllManager"
                element={
                  userContext.user ? (
                    <AllManager />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/AllEmployee"
                element={
                  userContext.user ? (
                    <AllEmployee />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/employee/:_id"
                element={
                  userContext.user ? (
                    <EmployeeProfile />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/manager/:_id"
                element={
                  userContext.user ? (
                    <ManagerProfile />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route
                path="/Org/:_id"
                element={
                  userContext.user ? (
                    <OrganisationProfile />
                  ) : (
                    <Navigate to="/auth/login" />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
          </DisplayContainer>
        </GridItem>
        <GridItem area="footer"></GridItem>
      </Grid>
    </>
  );
};

export default Layout;
