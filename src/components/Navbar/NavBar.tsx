import { Flex, useColorModeValue } from "@chakra-ui/react";
import NavbarMenu from "./NavbarMenu";
import NavigationMenu from "./NavigationMenu";

const NavBar = () => {
  return (
    <>
      <Flex
        as="header"
        boxShadow="base"
        position="fixed"
        bg={useColorModeValue("gray.50", "gray.700")}
        w="100%"
        justifyContent="space-between"
        p="2"
        zIndex={1}
      >
        <NavigationMenu />
        <NavbarMenu />
      </Flex>
    </>
  );
};

export default NavBar;
