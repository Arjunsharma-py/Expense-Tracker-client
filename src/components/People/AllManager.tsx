import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { Text } from "@chakra-ui/react";
import { Manager } from "../../hooks/useManager";
import DisplayPeople from "./DisplayPeople";

const AllManager = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Manager[]>([] as Manager[]);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/mng")
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

  return <DisplayPeople data={data} loading={loading} name="Managers" />;
};

export default AllManager;
