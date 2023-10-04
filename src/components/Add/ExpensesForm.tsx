import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { BeatLoader } from "react-spinners";
import apiClient from "../../services/api-client";
import { Manager } from "../../hooks/useManager";
import { Emp } from "../../hooks/useEmp";
import { useState } from "react";

const schema = z.object({
  mngId: z.string().nonempty(),
  empId: z.string().nonempty(),
  amount: z
    .number({ invalid_type_error: "Amount should be provided" })
    .min(1, { message: "Their must be min ₹1" }),
  purpose: z.string(),
});

interface Props {
  mngData: Manager[];
  empData: Emp[];
}

const ExpensesForm = ({ mngData, empData }: Props) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldUnregister: true,
  });

  const submitData = (data: FieldValues) => {
    if (!data.purpose) delete data.purpose;

    setLoading(true);
    apiClient
      .post("/exp", data)
      .then(() => {
        setLoading(false);
        toast({
          title: "Added",
          description: "Your data is saved",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Failed",
          description: "An error occured. Retry!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(submitData)} p={4}>
      <FormControl marginX={3} marginY={2}>
        <FormLabel htmlFor="mngId">By</FormLabel>
        <Select {...register("mngId")} id="mngId" placeholder="Select Manager">
          {mngData.map((mng) => (
            <option value={mng._id} key={mng._id}>
              {mng.name}
            </option>
          ))}
        </Select>
        {errors.mngId && (
          <FormHelperText color="red.500">
            {errors.mngId.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl marginX={3} marginY={2}>
        <FormLabel htmlFor="empId">To</FormLabel>
        <Select {...register("empId")} id="empId" placeholder="Select Employee">
          {empData.map((emp) => (
            <option value={emp._id} key={emp._id}>
              {emp.name}
            </option>
          ))}
        </Select>
        {errors.empId && (
          <FormHelperText color="red.500">
            {errors.empId.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl marginX={3} marginY={2}>
        <FormLabel htmlFor="amount">Amount</FormLabel>
        <Input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
        />
        {errors.amount && (
          <FormHelperText color="red.500">
            {errors.amount.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl marginX={3} marginY={2}>
        <FormLabel htmlFor="purpose">Purpose</FormLabel>
        <Input {...register("purpose")} id="purpose" type="text" />
      </FormControl>

      <Button
        isLoading={loading}
        spinner={<BeatLoader size={8} color="white" />}
        type="submit"
        marginX={3}
        marginY={2}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ExpensesForm;
