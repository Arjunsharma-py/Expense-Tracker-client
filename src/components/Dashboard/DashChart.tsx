import { Flex, Spinner } from "@chakra-ui/react";
import LineChart from "./LineChart";
import {
  BarQuery,
  DashboardQuery,
  dateAmount,
  profitdateAmount,
} from "../../hooks/useExpense";
import { useEffect, useState } from "react";
import BarGraph from "./BarGraph";
import apiClient from "../../services/api-client";
import Stats from "./Stats";
import { Org } from "../../hooks/useOrg";

const date = new Date();
const year = date.getFullYear();
const month = ("0" + (date.getMonth() + 1)).slice(-2);
const day = ("0" + date.getDate()).slice(-2);

const DashChart = () => {
  const [loading, setLoading] = useState(false);
  const [EAData, setEAData] = useState<dateAmount>({} as dateAmount);
  const [profitData, setProfitData] = useState<profitdateAmount>(
    {} as profitdateAmount
  );
  const [orgData, setOrgData] = useState<Org>({
    expenses: 0,
    assets: 0,
  } as Org);

  const [dashQuery] = useState<DashboardQuery>({
    from: `${year}-${month}-01`,
    to: `${year}-${month}-${day}`,
  } as DashboardQuery);

  const [barQuery] = useState<BarQuery>({
    from: `${year}-01-01`,
    to: `${year}-${month}-${day}`,
  } as BarQuery);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/dash", { params: dashQuery })
      .then((res) => {
        setEAData(res.data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dashQuery]);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/dash/profit", { params: barQuery })
      .then((res) => {
        setProfitData(res.data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [barQuery]);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/org/me")
      .then((res) => {
        setOrgData(res.data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && <Spinner />}
      <Stats
        lastProfit={
          Object.keys(profitData).length
            ? profitData.profits.length
              ? profitData.profits[profitData.profits.length - 1]
              : 0
            : 0
        }
        lastProfitPerc={
          Object.keys(profitData).length
            ? profitData.profitPerc.length
              ? profitData.profitPerc[profitData.profitPerc.length - 1]
              : 0
            : 0
        }
        totalExpense={orgData.expenses}
        totalAsset={orgData.assets}
      />
      <Flex
        direction={{ base: "column", md: "row" }}
        p={3}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <LineChart loading={loading} Data={EAData} />
        <BarGraph loading={loading} Data={profitData} />
      </Flex>
    </>
  );
};

export default DashChart;
