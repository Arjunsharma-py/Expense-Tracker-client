import {
  Button,
  HStack,
  Icon,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import useAsset, { AssetQuery } from "../../hooks/useAsset";
import { MdVerified } from "react-icons/md";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

interface Props {
  assetQuery: AssetQuery;
  onSetassetQuery: (assetQuery: AssetQuery) => void;
}

const TableContent = ({ assetQuery, onSetassetQuery }: Props) => {
  const { data, loading, error } = useAsset(assetQuery);

  let sno = 1;

  const showArrow = (cat: string) => {
    if (assetQuery.ordering === cat) return <BsArrowUp />;
    else if (assetQuery.ordering === "-" + cat) return <BsArrowDown />;
    else return <Text />;
  };

  const handleOrder = (cat: string) => {
    if (assetQuery.ordering === "-" + cat)
      onSetassetQuery({ ...assetQuery, ordering: cat });
    else if (assetQuery.ordering === cat)
      onSetassetQuery({ ...assetQuery, ordering: "-" + cat });
    else onSetassetQuery({ ...assetQuery, ordering: "-" + cat });
  };

  return (
    <>
      {error ? (
        <Text>Something went wrong</Text>
      ) : (
        <TableContainer>
          <Table variant="striped">
            <Thead bgColor={useColorModeValue("gray.50", "gray.800")}>
              <Tr>
                <Th>S.no.</Th>
                <Th>
                  <Button
                    variant="unstyled"
                    rightIcon={showArrow("date")}
                    onClick={() => handleOrder("date")}
                  >
                    Date
                  </Button>
                </Th>
                <Th>
                  <Button
                    variant="unstyled"
                    rightIcon={showArrow("manager")}
                    onClick={() => handleOrder("manager")}
                  >
                    Credit To
                  </Button>
                </Th>
                <Th>
                  <Button
                    variant="unstyled"
                    rightIcon={showArrow("source")}
                    onClick={() => handleOrder("source")}
                  >
                    source
                  </Button>
                </Th>
                <Th>
                  <Button
                    variant="unstyled"
                    rightIcon={showArrow("amount")}
                    onClick={() => handleOrder("amount")}
                  >
                    Amount
                  </Button>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((asset) => (
                <Tr key={asset._id}>
                  <Td>{sno++}</Td>
                  <Td>{new Date(asset.date).toDateString()}</Td>
                  <Td>
                    <HStack>
                      <Text>{asset.manager.name}</Text>
                      {asset.manager.isVerified && (
                        <Icon as={MdVerified} color="blue.500" />
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    <HStack>
                      <Text>{asset.source || "unknown"}</Text>
                    </HStack>
                  </Td>
                  <Td>₹{asset.amount}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {loading && <Spinner />}
    </>
  );
};

export default TableContent;
