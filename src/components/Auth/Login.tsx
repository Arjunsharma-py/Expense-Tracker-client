import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  useToast,
  FormHelperText,
  Divider,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../../services/api-client";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

const schema = z.object({
  email: z.string().nonempty({ message: "Enter your email!" }),
  password: z
    .string()
    .min(8, "password must be atleast 8 characters")
    .nonempty({ message: "Enter your password" }),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const sendEmail = (email: string) => {
    apiClient
      .post("/mng/sendOtp", { email: email })
      .then()
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

  const submitData = (data: FieldValues) => {
    setLoading(true);
    apiClient
      .post("/auth/login", data)
      .then((res) => {
        setLoading(false);
        toast({
          title: "Correct",
          description: "You are now logged in",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem("user", JSON.stringify(res.data.results));
        userContext.setUser(res.data.results);
        navigate("/dash");
        reset();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 403) {
          toast({
            title: "Verification",
            description: err.response.data.error,
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
          sendEmail(data.email);
          setLoading(false);
          localStorage.setItem("tempEmail", data.email);
          navigate("/auth/verify");
        } else {
          toast({
            title: "Failed",
            description: err.response
              ? err.response.data.error
              : "Request not send",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login to your account
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Welcome back 😊
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack as="form" spacing={4} onSubmit={handleSubmit(submitData)}>
            <FormControl id="email">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input {...register("email")} id="email" type="email" />
              {errors.email && (
                <FormHelperText color="red.500">
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input {...register("password")} id="password" type="password" />
              {errors.password && (
                <FormHelperText color="red.500">
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link to="/" color={"blue.400"}>
                  <Button variant="link" colorScheme="purple">
                    Forgot password?
                  </Button>
                </Link>
              </Stack>
              <Button
                type="submit"
                colorScheme="purple"
                isLoading={loading}
                spinner={<BeatLoader />}
              >
                Sign in
              </Button>
            </Stack>
            <Divider />
            <Text align={"center"}>
              doesn't have an account?
              <Link to="/auth/signup">
                <Button variant="link" pl={1} colorScheme="purple">
                  Join now
                </Button>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
