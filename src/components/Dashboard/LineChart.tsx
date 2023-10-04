import { dateAmount } from "../../hooks/useExpense";
import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  Data: dateAmount;
  loading: boolean;
}

const LineChart = ({ Data, loading }: Props) => {
  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Expenses and Assets",
        color: useColorModeValue("rgb(70, 70, 70)", "rgba(230, 230, 230, 1)"),
      },
    },
    maintainAspectRatio: false,
    // scales: {
    //   x: {
    //     ticks: {
    //       color: useColorModeValue(
    //         "rgb(70, 70, 70)",
    //         "rgba(230, 230, 230, 0.5)"
    //       ),
    //     },
    //     grid: {
    //       color: useColorModeValue(
    //         "rgba(200, 200, 200, 0.5)",
    //         "rgba(130, 130, 130, 0.5)"
    //       ),
    //     },
    //   },
    //   y: {
    //     ticks: {
    //       color: useColorModeValue(
    //         "rgb(70, 70, 70)",
    //         "rgba(230, 230, 230, 0.5)"
    //       ),
    //       callback: function (value) {
    //         return "₹" + value;
    //       },
    //     },
    //     grid: {
    //       color: useColorModeValue(
    //         "rgba(200, 200, 200, 0.5)",
    //         "rgba(130, 130, 130, 0.5)"
    //       ),
    //     },
    //   },
    // },
  };

  const data = {
    labels: Data.dates,
    datasets: [
      {
        label: "Expenses",
        data: Data.expAmounts,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Assets",
        data: Data.assetAmounts,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
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
          <Line options={options} data={data} />
        </Box>
      )}
    </>
  );
};

export default LineChart;
