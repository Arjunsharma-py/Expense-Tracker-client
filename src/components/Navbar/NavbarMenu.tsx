import {
  Avatar,
  AvatarBadge,
  Button,
  ButtonGroup,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
import ColorModeSwitch from "../ColorModeSwitch";
import { BiChevronDown } from "react-icons/bi";
import Logout from "../Auth/Logout";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import Requests from "./Requests";
import { Link } from "react-router-dom";

const NavbarMenu = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      <ButtonGroup>
        <Show above="md">
          {userContext.user.isAdmin && <Requests smallDevice={false} />}
          <ColorModeSwitch isSwitch={false} />
        </Show>

        <Menu>
          <MenuButton as={Button} variant="unstyled">
            <HStack>
              <Avatar size="sm" name={userContext.user.name} src={""}>
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
              <BiChevronDown />
            </HStack>
          </MenuButton>
          <MenuList>
            <Divider />
            <Link to={`/manager/${userContext.user._id}`}>
              <MenuItem color="purple.300">{userContext.user.name}</MenuItem>
            </Link>
            <Divider />
            <Link to={`/manager/${userContext.user._id}`}>
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link to="/AllManager">
              <MenuItem>Managers</MenuItem>
            </Link>
            <Link to="AllEmployee">
              <MenuItem>Employees</MenuItem>
            </Link>
            <Show below="md">
              {userContext.user.isAdmin && (
                <Link to="/requests">
                  <MenuItem>Joining requests</MenuItem>
                </Link>
              )}
              <MenuItem>
                <ColorModeSwitch isSwitch={true} />
              </MenuItem>
            </Show>
            <Divider />
            <MenuItem justifyContent="center">
              <Logout />
            </MenuItem>
          </MenuList>
        </Menu>
      </ButtonGroup>
    </>
  );
};

export default NavbarMenu;
