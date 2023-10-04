import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { Text } from "@chakra-ui/react";
import { Emp } from "../../hooks/useEmp";
import DisplayPeople from "./DisplayPeople";

const AllEmployee = () => {
  const [data, setData] = useState<Emp[]>([] as Emp[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/emp")
      .then((res) => {
        setLoading(false);
        setData(res.data.results);
      })
      .catch(() => {
        setLoading(false);
        return (
          <Text colorScheme="red.500">
            Something went wrong. Please refresh the page!
          </Text>
        );
      });
  }, []);

  return <DisplayPeople data={data} loading={loading} name="Employees" />;
};

export default AllEmployee;
