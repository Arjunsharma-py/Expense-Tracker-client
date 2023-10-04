import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";

const schema = z.object({
  name: z.string().min(3, "Name should be 3 altleast 3 characters"),
  email: z.string().nonempty(),
  type: z.string(),
  address: z.string(),
});

export default function OrgCreate() {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = (data: FieldValues) => {
    setLoading(true);
    apiClient
      .post("/org", data)
      .then((res) => {
        toast({
          title: "Registration successfull",
          description: "Your org is now registered!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(res.data.results));
        userContext.setUser(res.data.results);
        // localStorage.setItem("tempEmail", data.email);
        if (res.data.results.org) navigate("/dash");
        else navigate("/auth/verify");
        reset();
      })
      .catch((err) => {
        setLoading(false);
        toast({
          title: "Failed",
          description:
            err.response.status === 404
              ? "User not found!"
              : "Invalid email or password",
          status: "error",
          duration: 5000,
          isClosable: true,
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
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        as="form"
        onSubmit={handleSubmit(submitData)}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Create Organisation
        </Heading>
        <FormControl id="icon">
          <FormLabel>Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-er">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="name" isRequired>
          <FormLabel>Organisation</FormLabel>
          <Input
            placeholder="Enter your Organisation"
            _placeholder={{ color: "gray.500" }}
            type="text"
            id="name"
            {...register("name")}
          />
        </FormControl>
        {errors.name && (
          <FormHelperText color="red.500">{errors.name.message}</FormHelperText>
        )}
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="Enter email"
            _placeholder={{ color: "gray.500" }}
            type="email"
            id="email"
            {...register("email")}
          />
        </FormControl>
        {errors.email && (
          <FormHelperText color="red.500">
            {errors.email.message}
          </FormHelperText>
        )}
        <FormControl id="type">
          <FormLabel>Type</FormLabel>
          <Input
            placeholder="Type of organisation"
            _placeholder={{ color: "gray.500" }}
            type="text"
            id="type"
            {...register("type")}
          />
        </FormControl>
        <FormControl id="Address">
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="Enter your Address"
            _placeholder={{ color: "gray.500" }}
            type="text"
            id="address"
            {...register("address")}
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={() => navigate("/org")}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
            isLoading={loading}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
