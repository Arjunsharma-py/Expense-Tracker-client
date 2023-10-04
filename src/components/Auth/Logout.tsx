import { Button, Spinner, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { UserContext } from "../../context/UserProvider";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleSubmit = () => {
    setLoading(true);
    apiClient
      .post("/auth/logout")
      .then((res) => {
        setLoading(false);
        toast({
          title: "Correct",
          description: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.clear();
        userContext.setUser(null);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Failed",
          description:
            err.response.status === 404
              ? "User not found!"
              : "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Button
        onClick={handleSubmit}
        leftIcon={<BiLogOut />}
        isLoading={loading}
        spinner={<Spinner />}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
