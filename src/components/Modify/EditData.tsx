import {
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import { useEffect, useState } from "react";
import { Expense } from "../../hooks/useExpense";
import { Asset } from "../../hooks/useAsset";
import UpdateAssets from "./UpdateAssets";
import UpdateExpenses from "./UpdateExpenses";

const EditData = () => {
  const [expData, setExpData] = useState<Expense[]>([] as Expense[]);
  const [assetData, setAssetData] = useState<Asset[]>([] as Asset[]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/exp", { params: { ordering: "-date" } })
      .then((res) => {
        setExpData(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        return <Text>Something went wrong</Text>;
      });

    apiClient
      .get("/asset", { params: { ordering: "-date" } })
      .then((res) => {
        setAssetData(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        return <Text>Something went wrong</Text>;
      });
  }, []);

  return (
    <>
      <Tabs isFitted>
        <TabList>
          <Tab>Edit Expenses</Tab>
          <Tab>Edit Assets</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UpdateExpenses
              expData={expData}
              operation="edit"
              setExpData={(data) => setExpData(data)}
            />
            {loading && <Spinner />}
          </TabPanel>
          <TabPanel>
            <UpdateAssets
              assetData={assetData}
              operation="edit"
              setAssetData={(data) => setAssetData(data)}
            />
            {loading && <Spinner />}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default EditData;
