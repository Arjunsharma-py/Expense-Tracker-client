import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import ExpensesForm from "./ExpensesForm";
import AssetsForm from "./AssetsForm";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { Manager } from "../../hooks/useManager";
import { Emp } from "../../hooks/useEmp";

const AddData = () => {
  const [mngData, setMngData] = useState<Manager[]>([] as Manager[]);
  const [empData, setEmpData] = useState<Emp[]>([] as Emp[]);

  useEffect(() => {
    apiClient
      .get("/mng")
      .then((res) => {
        setMngData(res.data.results);
      })
      .catch(() => {
        return (
          <Text colorScheme="red.500">
            Something went wrong. Please refresh the page!
          </Text>
        );
      });
    apiClient
      .get("/emp")
      .then((res) => {
        setEmpData(res.data.results);
      })
      .catch(() => {
        return (
          <Text colorScheme="red.500">
            Something went wrong. Please refresh the page!
          </Text>
        );
      });
  }, []);

  return (
    <>
      <Tabs isFitted>
        <TabList>
          <Tab>Add Expense</Tab>
          <Tab>Add Assets</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ExpensesForm mngData={mngData} empData={empData} />
          </TabPanel>
          <TabPanel>
            <AssetsForm mngData={mngData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default AddData;
