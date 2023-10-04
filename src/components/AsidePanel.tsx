import { Link, useLocation } from "react-router-dom";
import { Button, Divider, Flex, List, ListItem } from "@chakra-ui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { AiFillDashboard } from "react-icons/ai";
import { GiExpense } from "react-icons/gi";
import { BsFillPiggyBankFill } from "react-icons/bs";

const AsidePanel = () => {
  const location = useLocation();
  const getVariant = (linkPath: string) => {
    if (location.pathname === linkPath) return "solid";
    return "ghost";
  };

  return (
    <Flex mt={16} px={5} position="fixed">
      <List>
        <ListItem py={2}>
          <Link to="/dash">
            <Button variant={getVariant("/")} leftIcon={<AiFillDashboard />}>
              Dashboard
            </Button>
          </Link>
        </ListItem>
        <Divider my={4} />
        <ListItem py={2}>
          <Link to="/add">
            <Button variant={getVariant("/add")} leftIcon={<IoCreate />}>
              Add
            </Button>
          </Link>
        </ListItem>
        <ListItem py={2}>
          <Link to="/edit">
            <Button variant={getVariant("/edit")} leftIcon={<MdEdit />}>
              Edit
            </Button>
          </Link>
        </ListItem>
        <ListItem py={2}>
          <Link to="/del">
            <Button variant={getVariant("/del")} leftIcon={<MdDelete />}>
              Delete
            </Button>
          </Link>
        </ListItem>
        <Divider my={4} />
        <ListItem py={2}>
          <Link to="/expenses">
            <Button variant={getVariant("/expenses")} leftIcon={<GiExpense />}>
              Expenes
            </Button>
          </Link>
        </ListItem>
        <ListItem py={2}>
          <Link to="/assets">
            <Button
              variant={getVariant("/assets")}
              leftIcon={<BsFillPiggyBankFill />}
            >
              Assets
            </Button>
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
};

export default AsidePanel;
