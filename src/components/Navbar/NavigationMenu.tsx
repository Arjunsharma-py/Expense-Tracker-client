import {
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Show,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import reactImage from "../../assets/react.png";
import { UserContext } from "../../context/UserProvider";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavigationMenu = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      <Show below="lg">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<RxHamburgerMenu />}
            variant="outline"
          ></MenuButton>
          {userContext.user.org ? (
            <MenuList>
              <MenuItem onClick={() => navigate("/dash")}>Dashboard</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate("/add")}>Add</MenuItem>
              <MenuItem onClick={() => navigate("/edit")}>Edit</MenuItem>
              <MenuItem onClick={() => navigate("/del")}>Delete</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate("/expenses")}>
                Expenses
              </MenuItem>
              <MenuItem onClick={() => navigate("/assets")}>Assets</MenuItem>
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem>Create Orgnisation</MenuItem>
              <MenuItem>Join Orgnisation</MenuItem>
            </MenuList>
          )}
        </Menu>
      </Show>
      <Link to="/">
        <Image height="45px" width="45px" src={reactImage} />
      </Link>
    </>
  );
};

export default NavigationMenu;
