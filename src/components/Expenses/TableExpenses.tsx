import {
  Button,
  HStack,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import useExpense, { ExpenseQuery } from "../../hooks/useExpense";
import { MdVerified } from "react-icons/md";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

interface Props {
  expenseQuery: ExpenseQuery;
  onSetExpenseQuery: (expenseQuery: ExpenseQuery) => void;
}

const TableContent = ({ expenseQuery, onSetExpenseQuery }: Props) => {
  const { data, loading, error } = useExpense(expenseQuery);

  let sno = 1;

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

  return (
    <>
      {error ? (
        <Text>Something went wrong</Text>
      ) : (
        <TableContainer>
          <Table variant="striped">
            <Thead bgColor={useColorModeValue("gray.50", "gray.800")}>
              <Tr>
                <Th>S.no.</Th>
                <Th>
                  <Button
                    variant="unstyled"
                    rightIcon={showArrow("date")}
                    onClick={() => handleOrder("date")}
                  >
                    Date
                  </Button>
                </Th>
                <Th>
                  <Button
                    variant="unstyled"
                    rightIcon={showArrow("manager")}
                    onClick={() => handleOrder("manager")}
                  >
                    By
                  </Button>
                </Th>
                <Th>
                  <Button
                    variant="unstyled"
                    rightIcon={showArrow("emp")}
                    onClick={() => handleOrder("emp")}
                  >
                    To
                  </Button>
                </Th>
                <Th>
                  <Button
                    variant="unstyled"
                    rightIcon={showArrow("amount")}
                    onClick={() => handleOrder("amount")}
                  >
                    Amount
                  </Button>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((expense) => (
                <Tr key={expense._id}>
                  <Td>{sno++}</Td>
                  <Td>{new Date(expense.date).toDateString()}</Td>
                  <Td>
                    <HStack>
                      <Text>{expense.manager.name}</Text>
                      {expense.manager.isVerified && (
                        <Icon as={MdVerified} color="blue.500" />
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    <HStack>
                      <Text>{expense.emp.name}</Text>
                      {expense.emp.isVerified && (
                        <Icon as={MdVerified} color="gray.300" />
                      )}
                    </HStack>
                  </Td>
                  <Td>₹{expense.amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {loading && <Spinner />}
    </>
  );
};

export default TableContent;
