import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../../services/api-client";
import { Manager } from "../../hooks/useManager";
import { FieldValues, useForm } from "react-hook-form";
import { Asset } from "../../hooks/useAsset";
import { BeatLoader } from "react-spinners";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editData: Asset;
  onSetForm: (status: boolean) => void;
  onSetAsset: (results: Asset) => void;
}

const schema = z.object({
  mngId: z.string(),
  source: z.string(),
  amount: z
    .number({ invalid_type_error: "Amount should be provided" })
    .min(1, { message: "Their must be min ₹1" }),
});

const EditAssetsForm = ({
  isOpen,
  onClose,
  editData,
  onSetForm,
  onSetAsset,
}: Props) => {
  const [mngData, setMngData] = useState<Manager[]>([] as Manager[]);
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
    defaultValues: {
      mngId: editData.manager._id,
      source: editData.source,
      amount: editData.amount,
    },
  });

  useEffect(() => {
    apiClient
      .get("/mng")
      .then((res) => {
        setMngData(res.data.results);
      })
      .catch(() => {
        return (
          <Text colorScheme="red.500">
            Something went wrong. Please refresh the page!
          </Text>
        );
      });
  }, []);

  const submitData = (data: FieldValues) => {
    if (!data.source.length) delete data.source;

    setLoading(true);
    apiClient
      .patch(`/asset/${editData._id}`, data)
      .then((res) => {
        setLoading(false);
        toast({
          title: "Updated",
          description: "Your data is updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
        onSetAsset(res.data.results);
        onSetForm(false);
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
        onSetForm(false);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onSetForm(false);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(submitData)}>
        <ModalHeader>Edit Assets</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="mngId">By</FormLabel>
            <Select
              {...register("mngId")}
              id="mngId"
              placeholder="Select Manager"
              defaultValue={editData.manager._id}
            >
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

          <FormControl>
            <FormLabel htmlFor="source">Purpose</FormLabel>
            <Input {...register("source")} id="purpose" type="text" />
          </FormControl>

          <FormControl>
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
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onSetForm(false);
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            colorScheme="gray"
            mr={3}
            type="submit"
            isLoading={loading}
            spinner={<BeatLoader />}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAssetsForm;
