import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  FormHelperText,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../../services/api-client";

const schema = z.object({
  name: z.string().min(3, "name should be atleast 3 characters"),
  email: z.string(),
});

const AddEmployee = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

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
      .post("/emp/add", data)
      .then(() => {
        toast({
          title: "Registration successfull",
          description: "Employee added!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        reset();
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Failed",
          description: "Some thing went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button variant="solid" colorScheme="whatsapp">
            Add
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader fontWeight="extrabold">
              Register Employee
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody as="form" onSubmit={handleSubmit(submitData)}>
              <FormControl id="firstName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input id="firstname" {...register("name")} type="text" />
                {errors.name && (
                  <FormHelperText color="red.500">
                    {errors.name.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input id="email" {...register("email")} type="email" />
                {errors.email && (
                  <FormHelperText color="red.500">
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Center>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  colorScheme="purple"
                  isLoading={loading}
                  my={2}
                >
                  Save
                </Button>
              </Center>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
};

export default AddEmployee;
