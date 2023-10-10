import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../../services/api-client";

const schema = z
  .object({
    firstname: z.string().nonempty({ message: "Enter your first name" }),
    lastname: z.string(),
    email: z.string().nonempty({ message: "Enter your email!" }),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/,
        "Password must be complex"
      )
      .nonempty({ message: "Enter your password" }),
    confirmpass: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .nonempty({ message: "Confirm your password" }),
  })
  .refine((pass) => pass.password === pass.confirmpass, {
    message: "Password and confirm password do not match",
    path: ["confirmpass"],
  });

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    delete data["confirmpass"];
    if (!data.lastname.length) delete data["lastname"];
    setLoading(true);
    apiClient
      .post("/mng", data)
      .then(() => {
        toast({
          title: "Registration successfull",
          description: "You are now registered!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        sendEmail(data.email);
        setLoading(false);
        localStorage.setItem("tempEmail", data.email);
        navigate("/auth/verify");
        reset();
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Failed",
          description: err.response
            ? err.response.data.error
            : "Request not send",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={6} mx={"auto"} maxW={"lg"} py={2} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack as="form" spacing={4} onSubmit={handleSubmit(submitData)}>
              <Flex
                align={"center"}
                justify={"center"}
                direction={{ base: "column", md: "row" }}
              >
                <Box pr={3}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      id="firstname"
                      {...register("firstname")}
                      type="text"
                    />
                    {errors.firstname && (
                      <FormHelperText color="red.500">
                        {errors.firstname.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      id="lastname"
                      {...register("lastname")}
                      type="text"
                    />
                    {errors.lastname && (
                      <FormHelperText color="red.500">
                        {errors.lastname.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Box>
              </Flex>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input id="email" {...register("email")} type="email" />
                {errors.email && (
                  <FormHelperText color="red.500">
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && (
                  <FormHelperText color="red.500">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="confirmpass" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    id="confirmpass"
                    {...register("confirmpass")}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.confirmpass && (
                  <FormHelperText color="red.500">
                    {errors.confirmpass.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  colorScheme="purple"
                  isLoading={loading}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?
                  <Link to="/auth/login">
                    <Button variant="link" pl={1} colorScheme="purple">
                      Login
                    </Button>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      )
    </>
  );
}
