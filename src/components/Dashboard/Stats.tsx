import {
  Flex,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  lastProfit: number;
  lastProfitPerc: number;
  totalExpense: number;
  totalAsset: number;
}

const Stats = ({
  lastProfit,
  lastProfitPerc,
  totalExpense,
  totalAsset,
}: Props) => {
  const totalProfit = totalAsset - totalExpense;
  const totalProfitPerc = (totalProfit / (totalExpense || 1)) * 100;
  const bgcol = useColorModeValue("gray.50", "gray.700");

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        w={"100%"}
        p={4}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          w={"100%"}
          justifyContent="center"
          alignItems="center"
        >
          <Stat
            boxShadow="md"
            rounded="xl"
            p={3}
            w={"75%"}
            m={4}
            bgColor={bgcol}
          >
            <StatLabel>Recent Profit</StatLabel>
            <StatNumber color={lastProfit >= 0 ? "green.400" : "red.300"}>
              ₹{lastProfit.toLocaleString("en-IN")}
            </StatNumber>
            <StatHelpText>
              <StatArrow type={lastProfitPerc >= 0 ? "increase" : "decrease"} />
              {lastProfitPerc.toFixed(1)}%
            </StatHelpText>
          </Stat>
          <Stat
            boxShadow="md"
            rounded="xl"
            p={3}
            w={"75%"}
            m={4}
            bgColor={bgcol}
          >
            <StatLabel>Net Profit</StatLabel>
            <StatNumber color={totalProfit >= 0 ? "green.400" : "red.300"}>
              ₹{totalProfit.toLocaleString("en-IN")}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={totalProfitPerc >= 0 ? "increase" : "decrease"}
              />
              {totalProfitPerc.toFixed(1)}%
            </StatHelpText>
          </Stat>
        </Flex>
        <Flex
          direction={{ base: "column", sm: "row" }}
          w={"100%"}
          justifyContent="center"
          alignItems="center"
        >
          <Stat
            boxShadow="md"
            rounded="xl"
            p={3}
            w={"75%"}
            m={4}
            bgColor={bgcol}
          >
            <StatLabel>Total Assets</StatLabel>
            <StatNumber>₹{totalAsset.toLocaleString("en-IN")}</StatNumber>
            <StatHelpText>{new Date().getFullYear()}</StatHelpText>
          </Stat>
          <Stat
            boxShadow="md"
            rounded="xl"
            p={3}
            w={"75%"}
            m={4}
            bgColor={bgcol}
          >
            <StatLabel>Expenses</StatLabel>
            <StatNumber>₹{totalExpense.toLocaleString("en-IN")}</StatNumber>
            <StatHelpText>{new Date().getFullYear()}</StatHelpText>
          </Stat>
        </Flex>
      </Flex>
    </>
  );
};

export default Stats;
