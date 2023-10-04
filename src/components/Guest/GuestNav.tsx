import {
  Button,
  ButtonGroup,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import reactImage from "../../assets/react.png";
import { Link } from "react-router-dom";
import ColorModeSwitch from "../ColorModeSwitch";

const GuestNav = () => {
  return (
    <>
      <Flex
        as="header"
        boxShadow="base"
        position="fixed"
        bg={useColorModeValue("gray.50", "gray.700")}
        w="100%"
        justifyContent="space-between"
        p="3"
        zIndex={1}
      >
        <Link to="/">
          <Image height="45px" width="45px" src={reactImage} />
        </Link>
        <ButtonGroup>
          <ColorModeSwitch isSwitch={false} />
          <Link to="/auth/login">
            <Button variant="outline" colorScheme="purple">
              Sign In
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button colorScheme="purple">Sign Up</Button>
          </Link>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default GuestNav;
