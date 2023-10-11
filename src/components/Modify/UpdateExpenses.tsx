import {
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  Show,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import apiClient from "../../services/api-client";
import { Expense } from "../../hooks/useExpense";
import EditExpensesForm from "./EditExpensesForm";
import { useState } from "react";

interface Props {
  expData: Expense[];
  operation: String;
  setExpData: (data: Expense[]) => void;
}

const UpdateExpenses = ({ operation, expData, setExpData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [editableData, setEditableData] = useState<Expense>({} as Expense);
  const [showForm, setShowForm] = useState(false);

  let tempDate = new Date(0);
  let sno = 1;

  const handleDelete = (id: string) => {
    apiClient
      .delete(`/exp/${id}`)
      .then(() => {
        toast({
          title: "Deleted",
          description: "Data deleted Successfully!",
          status: "success",
          isClosable: true,
          duration: 2000,
        });
        setExpData(expData.filter((obj) => obj._id !== id));
      })
      .catch(() =>
        toast({
          title: "Failed",
          description: "failed to delete. Retry!",
          duration: 3000,
          isClosable: true,
          status: "error",
        })
      );
  };

  const handleShowForm = (exp: Expense) => {
    setEditableData(exp);
    setShowForm(true);
    onOpen();
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
      {showForm && (
        <EditExpensesForm
          isOpen={isOpen}
          onClose={onClose}
          editData={editableData}
          onSetForm={(status) => setShowForm(status)}
          onSetExp={(results) => {
            const i = expData.findIndex((data) => data._id === results._id);
            expData[i] = results;
            setExpData(expData);
          }}
        />
      )}
      <Show below="md">
        <Stack spacing={4}>
          <Heading>{operation === "del" ? "Delete" : "Edit"} Expenses</Heading>
          <Divider />
          {expData.map((exp) => (
            <div key={exp._id}>
              {checkDate(exp.date) && (
                <Text>{new Date(exp.date).toDateString()}</Text>
              )}
              <Card key={exp._id} variant="filled" size="sm" p={3}>
                <CardBody>
                  <HStack>
                    <Stack>
                      <Text fontSize={{ base: 11, md: 12 }}>
                        Credit to: {exp.manager.name}
                      </Text>
                      <Text fontSize={{ base: 11, md: 12 }}>
                        Amount: {exp.amount}
                      </Text>
                      <Text fontSize={{ base: 11, md: 12 }}>
                        Purpose: {exp.purpose || "unknown"}
                      </Text>
                    </Stack>
                    <Spacer />
                    {operation === "del" ? (
                      <Button
                        onClick={() => handleDelete(exp._id)}
                        colorScheme="red"
                      >
                        <AiOutlineDelete />
                      </Button>
                    ) : (
                      <Button onClick={() => handleShowForm(exp)}>Edit</Button>
                    )}
                  </HStack>
                </CardBody>
              </Card>
            </div>
          ))}
        </Stack>
      </Show>
      <Show above="md">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>S.no.</Th>
                <Th>Date</Th>
                <Th>By</Th>
                <Th>To</Th>
                <Th>Amount</Th>
                <Th>Operation</Th>
              </Tr>
            </Thead>

            <Tbody>
              {expData.map((exp) => (
                <Tr key={exp._id}>
                  <Td>{sno++}</Td>
                  <Td>{new Date(exp.date).toDateString()}</Td>
                  <Td>
                    <Text>{exp.manager.name}</Text>
                  </Td>
                  <Td>
                    <HStack>
                      <Text>{exp.emp.name}</Text>
                    </HStack>
                  </Td>
                  <Td>₹{exp.amount}</Td>
                  {operation === "del" ? (
                    <Td>
                      <Button
                        onClick={() => handleDelete(exp._id)}
                        colorScheme="red"
                      >
                        <AiOutlineDelete />
                      </Button>
                    </Td>
                  ) : (
                    <Td>
                      <Button onClick={() => handleShowForm(exp)}>Edit</Button>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Show>
    </>
  );
};

export default UpdateExpenses;
