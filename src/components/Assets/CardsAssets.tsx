import {
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useAsset, { AssetQuery } from "../../hooks/useAsset";

interface Props {
  assetQuery: AssetQuery;
  onSetassetQuery: (assetQuery: AssetQuery) => void;
}

const CardsAssets = ({ assetQuery, onSetassetQuery }: Props) => {
  const { data, loading, error } = useAsset(assetQuery);
  let tempDate = new Date(0);

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

  const checkDate = (date: Date) => {
    if (new Date(tempDate).getDate() !== new Date(date).getDate()) {
      tempDate = date;
      return true;
    }
    return false;
  };

  return (
    <>
      {error ? (
        <Text>Something went wrong</Text>
      ) : (
        <Stack spacing={4} p={3}>
          <HStack>
            <Heading>Assets</Heading>
            <Spacer />
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                Sort
              </MenuButton>
              <MenuList>
                <MenuItem
                  as={Button}
                  onClick={() => handleOrder("date")}
                  rightIcon={showArrow("date")}
                >
                  Date
                </MenuItem>
                <MenuItem
                  as={Button}
                  onClick={() => handleOrder("amount")}
                  rightIcon={showArrow("amount")}
                >
                  Amount
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Divider />
          {data.map((asset) => (
            <div key={asset._id}>
              {checkDate(asset.date) && (
                <Text>{new Date(asset.date).toDateString()}</Text>
              )}
              <Card key={asset._id} variant="filled" size="sm" p={3}>
                <CardBody>
                  <Stack>
                    <Text fontSize={{ base: 11, md: 12 }}>
                      Credit To: {asset.manager.name}
                    </Text>
                    <Text fontSize={{ base: 11, md: 12 }}>
                      Amount: {asset.amount}
                    </Text>
                    <Text fontSize={{ base: 11, md: 12 }}>
                      Source: {asset.source || "unknown"}
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            </div>
          ))}
        </Stack>
      )}
      {loading && <Spinner />}
    </>
  );
};

export default CardsAssets;
