import {
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import useExpense, { ExpenseQuery } from "../../hooks/useExpense";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface Props {
  expenseQuery: ExpenseQuery;
  onSetExpenseQuery: (expenseQuery: ExpenseQuery) => void;
}

const CardsExpenses = ({ expenseQuery, onSetExpenseQuery }: Props) => {
  const { data, loading, error } = useExpense(expenseQuery);
  let tempDate = new Date(0);

  const showArrow = (cat: string) => {
    if (expenseQuery.ordering === cat) return <BsArrowUp />;
    else if (expenseQuery.ordering === "-" + cat) return <BsArrowDown />;
    else return <Text />;
  };

  const handleOrder = (cat: string) => {
    if (expenseQuery.ordering === "-" + cat)
      onSetExpenseQuery({ ...expenseQuery, ordering: cat });
    else if (expenseQuery.ordering === cat)
      onSetExpenseQuery({ ...expenseQuery, ordering: "-" + cat });
    else onSetExpenseQuery({ ...expenseQuery, ordering: "-" + cat });
  };

  const checkDate = (date: Date) => {
    if (new Date(tempDate).getDate() !== new Date(date).getDate()) {
      tempDate = date;
      return true;
    }
    return false;
  };

  return (
    <>
      {error ? (
        <Text>Something went wrong</Text>
      ) : (
        <Stack spacing={4} p={3}>
          <HStack>
            <Heading>Expenses</Heading>
            <Spacer />
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Sort
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={Button}
                  onClick={() => handleOrder("date")}
                  rightIcon={showArrow("date")}
                >
                  Date
                </MenuItem>
                <MenuItem
                  as={Button}
                  onClick={() => handleOrder("amount")}
                  rightIcon={showArrow("amount")}
                >
                  Amount
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Divider />
          {data.map((exp) => (
            <div key={exp._id}>
              {checkDate(exp.date) && (
                <Text>{new Date(exp.date).toDateString()}</Text>
              )}
              <Card key={exp._id} variant="filled" size="sm" p={3}>
                <CardBody>
                  <Stack>
                    <Text fontSize={{ base: 11, md: 12 }}>
                      By: {exp.manager.name}
                    </Text>
                    <Text fontSize={{ base: 11, md: 12 }}>
                      To: {exp.emp.name}
                    </Text>
                    <Text fontSize={{ base: 11, md: 12 }}>
                      Amount: {exp.amount}
                    </Text>
                    <Text fontSize={{ base: 11, md: 12 }}>
                      Purpose: {exp.purpose || "unknown"}
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            </div>
          ))}
        </Stack>
      )}
      {loading && <Spinner />}
    </>
  );
};

export default CardsExpenses;
