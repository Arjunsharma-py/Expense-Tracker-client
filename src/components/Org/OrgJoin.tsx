import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Org } from "../../hooks/useOrg";
import apiClient from "../../services/api-client";

const OrgJoin = () => {
  const toast = useToast();
  const [data, setData] = useState<Org[]>([] as Org[]);
  const [applied, setApplied] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("applied");
    if (name) setApplied(name);
    else {
      setLoading(true);
      apiClient
        .get("/org")
        .then((res) => {
          setData(res.data.results);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          return <Text>Something went wrong</Text>;
        });
    }
  }, []);

  const submitData = (org: Org) => {
    apiClient
      .post(`/org/join/${org._id}`)
      .then(() => {
        localStorage.setItem("applied", JSON.stringify(org.name));
        setApplied(org.name);
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
    <>
      <Box>
        {!data.length && !applied && (
          <Center>
            <Heading>
              No organisation yet! Create your own organisation. 😊
            </Heading>
          </Center>
        )}
        {!applied.length ? (
          loading ? (
            <Spinner />
          ) : (
            <Flex direction="column" m={4}>
              {data.map((org) => (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  my={2}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={2}
                >
                  <Text>{org.name}</Text>
                  <Button onClick={() => submitData(org)}>Apply</Button>
                </Box>
              ))}
            </Flex>
          )
        ) : (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Application submitted!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thanks for submitting your application. Admin of {applied} will
              get back to you soon.
            </AlertDescription>
          </Alert>
        )}
      </Box>
    </>
  );
};

export default OrgJoin;
