import {
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Spinner,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import AddEmployee from "../Employee/AddEmployee";
import { Link } from "react-router-dom";

interface Props {
  data: { name: string; _id: string }[];
  loading: boolean;
  name: string;
}

const DisplayPeople = ({ data, loading, name }: Props) => {
  return (
    <>
      <Card m={2}>
        <CardHeader>
          <HStack>
            <Heading size="md" mr={5}>
              {name}
            </Heading>
            {name === "Employees" && <AddEmployee />}
          </HStack>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {loading && <Spinner />}
            {data.map((people) => (
              <Box key={people._id}>
                <Heading size="xs" textTransform="uppercase">
                  <Link
                    to={
                      name === "Managers"
                        ? `/manager/${people._id}`
                        : `/employee/${people._id}`
                    }
                  >
                    {people.name}
                  </Link>
                </Heading>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default DisplayPeople;
