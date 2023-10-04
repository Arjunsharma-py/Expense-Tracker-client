import { Bar } from "react-chartjs-2";
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";
import { profitdateAmount } from "../../hooks/useExpense";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  loading: boolean;
  Data: profitdateAmount;
}

const BarGraph = ({ loading, Data }: Props) => {
  const colorSelector = (dates: number[]) => {
    const colors: string[] = [];
    if (!dates) return;
    dates.map((date) =>
      date >= 0
        ? colors.push("rgb(1, 177, 163)")
        : colors.push("rgb(251, 90, 86)")
    );
    return colors;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Profit Percentage",
        color: useColorModeValue("rgb(70, 70, 70)", "rgba(230, 230, 230, 1)"),
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: useColorModeValue(
            "rgb(70, 70, 70)",
            "rgba(230, 230, 230, 0.5)"
          ),
        },
        grid: {
          color: useColorModeValue(
            "rgba(200, 200, 200, 0.5)",
            "rgba(130, 130, 130, 0.5)"
          ),
        },
      },
      y: {
        ticks: {
          color: useColorModeValue(
            "rgb(70, 70, 70)",
            "rgba(230, 230, 230, 0.5)"
          ),
          callback: function (value: any) {
            return "₹" + value;
          },
        },
        grid: {
          color: useColorModeValue(
            "rgba(200, 200, 200, 0.5)",
            "rgba(130, 130, 130, 0.5)"
          ),
        },
      },
    },
  };

  const data = {
    labels: Data.dates,
    datasets: [
      {
        label: "Profit",
        data: Data.profits,
        barPercentage: 0.3,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: colorSelector(Data.profits),
      },
    ],
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box
          boxShadow="md"
          rounded="xl"
          bg={useColorModeValue("gray.50", "gray.700")}
          // w={{ base: 350, md: 400, lg: 500 }}
          w={"75%"}
          h={{ base: 210, md: 240, lg: 300 }}
          p={4}
          m={3}
        >
          <Bar options={options} data={data} />
        </Box>
      )}
    </>
  );
};

export default BarGraph;
