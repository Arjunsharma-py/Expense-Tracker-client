import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { BsBuildingAdd } from "react-icons/bs";
import { PiUserCirclePlus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const OrgDisplay = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        minH={"90vh"}
        justify={"center"}
        align={"center"}
        p={4}
      >
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          <Card>
            <CardHeader>
              <Heading size="md">Create Organisation</Heading>
            </CardHeader>
            <CardBody>
              <Text>
                Create your own organisation and invite all the managers.
              </Text>
            </CardBody>
            <CardFooter>
              <Button
                leftIcon={<BsBuildingAdd />}
                onClick={() => navigate("/org/create")}
              >
                Create
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Join Organisation</Heading>
            </CardHeader>
            <CardBody>
              <Text>Join your existing the organisation. </Text>
            </CardBody>
            <CardFooter>
              <Button
                leftIcon={<PiUserCirclePlus />}
                onClick={() => navigate("/org/join")}
              >
                Join
              </Button>
            </CardFooter>
          </Card>
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default OrgDisplay;
