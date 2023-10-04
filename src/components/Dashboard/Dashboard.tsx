import { Badge, HStack, Heading } from "@chakra-ui/react";
import DashChart from "./DashChart";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

const Dashboard = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <HStack m={4}>
        <Heading>Welcome</Heading>
        <Heading color="purple.400"> {userContext.user.name}</Heading>
        {userContext.user.isAdmin && (
          <Badge colorScheme="purple">isAdmin</Badge>
        )}
      </HStack>
      <DashChart />
    </>
  );
};

export default Dashboard;
