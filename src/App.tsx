import "./App.css";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserProvider";
import Layout from "./components/Layouts/Layout";

function App() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    const userinfo = localStorage.getItem("user");
    if (userinfo) userContext.setUser(JSON.parse(userinfo));
  }, []);

  return (
    <>
      <Layout />
    </>
  );
}

export default App;
