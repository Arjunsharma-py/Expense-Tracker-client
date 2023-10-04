import { Center, Heading, Text, useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

export default function OtpVerify() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    const tempdata = localStorage.getItem("tempEmail");
    if (!tempdata) navigate("/auth/login");
    else {
      setEmail(tempdata);
    }
  }, []);

  const sendEmail = (email: string) => {
    apiClient
      .post("/mng/sendOtp", { email: email })
      .then(() => {
        toast({
          title: "Resend otp",
          description: "Otp send to your email",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Error sending messages resend otp!",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      });
  };

  const verifyEmail = (otp: string) => {
    const otpdata = { email: email, otp: parseInt(otp) };
    setLoading(true);
    apiClient
      .post("/mng/verifyotp", otpdata)
      .then((res) => {
        setLoading(false);
        toast({
          title: "Registration Successful!",
          description: "You are now logged in",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.removeItem("tempEmail");
        localStorage.setItem("user", JSON.stringify(res.data.results));
        userContext.setUser(res.data.results);
        navigate("/dash");
      })
      .catch((err) => {
        setOtp("");
        setLoading(false);
        toast({
          title: err.response.status === 403 ? "Invalid otp" : "Error",
          description:
            err.response.status === 403 ? "Invalid otp" : "Somthing went wrong",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {email}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput value={otp} onChange={(value) => setOtp(value)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            colorScheme="purple"
            type="button"
            isDisabled={otp.length < 6}
            isLoading={loading}
            loadingText="Verifying"
            onClick={() => verifyEmail(otp)}
          >
            Verify
          </Button>
        </Stack>
        <Stack pt={6}>
          <Text align={"center"}>
            Didn't get the code?
            <Button
              variant="link"
              pl={1}
              colorScheme="purple"
              onClick={() => sendEmail(email)}
            >
              Resend
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
}
