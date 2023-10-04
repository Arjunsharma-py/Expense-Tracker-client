import {
  Button,
  ButtonGroup,
  HStack,
  List,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { PiUserCirclePlus } from "react-icons/pi";

interface obj {
  _id: string;
  name: string;
}

const Requests = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<obj[]>([] as obj[]);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    apiClient
      .get("/org/me")
      .then((res) => {
        setLoading(false);
        setData(res.data.results.applicants);
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Error",
          description: "Something went wrong!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }, []);

  const submitData = (obj: obj) => {
    apiClient
      .post(`/mng/addmng/${obj._id}`)
      .then(() => {
        toast({
          title: "Manager Added",
          description: `${obj.name}`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setData(data.filter((d) => d._id !== obj._id));
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong!",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="unstyled">
          <PiUserCirclePlus size="22px" />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            {data.length ? "Requests" : "No request"}
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {loading ? (
              <Spinner />
            ) : (
              <List spacing={1}>
                {data.map((manager) => (
                  <ListItem>
                    <HStack justifyContent="space-between">
                      <Text>{manager.name}</Text>
                      <ButtonGroup>
                        <Button onClick={() => submitData(manager)}>yes</Button>
                        {/* <Button onClick={() => submitData(manager)}>no</Button> */}
                      </ButtonGroup>
                    </HStack>
                  </ListItem>
                ))}
              </List>
            )}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Requests;
