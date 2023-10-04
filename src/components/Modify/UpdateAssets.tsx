import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import apiClient from "../../services/api-client";
import { Asset } from "../../hooks/useAsset";
import EditAssetsForm from "./EditAssetsForm";
import { useState } from "react";

interface Props {
  assetData: Asset[];
  operation: String;
  setAssetData: (data: Asset[]) => void;
}

const UpdateAssets = ({ operation, assetData, setAssetData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [editableData, setEditableData] = useState<Asset>({} as Asset);
  const [showForm, setShowForm] = useState(false);

  let sno = 1;

  const handleDelete = (id: string) => {
    apiClient
      .delete(`/asset/${id}`)
      .then(() => {
        toast({
          title: "Deleted",
          description: "Data deleted Successfully!",
          status: "success",
          isClosable: true,
          duration: 2000,
        });
        setAssetData(assetData.filter((obj) => obj._id !== id));
      })
      .catch(() =>
        toast({
          title: "Failed",
          description: "failed to delete. Retry!",
          duration: 3000,
          isClosable: true,
          status: "error",
        })
      );
  };

  const handleShowForm = (asset: Asset) => {
    setEditableData(asset);
    setShowForm(true);
    onOpen();
  };

  return (
    <>
      {showForm && (
        <EditAssetsForm
          isOpen={isOpen}
          onClose={onClose}
          editData={editableData}
          onSetForm={(status) => setShowForm(status)}
          onSetAsset={(results) => {
            const i = assetData.findIndex((data) => data._id === results._id);
            assetData[i] = results;
            setAssetData(assetData);
          }}
        />
      )}
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S.no.</Th>
              <Th>Date</Th>
              <Th>Credit To</Th>
              <Th>source</Th>
              <Th>Amount</Th>
              <Th>Operation</Th>
            </Tr>
          </Thead>

          <Tbody>
            {assetData.map((asset) => (
              <Tr key={asset._id}>
                <Td>{sno++}</Td>
                <Td>{new Date(asset.date).toDateString()}</Td>
                <Td>
                  <Text>{asset.manager.name}</Text>
                </Td>
                <Td>{asset.source ? asset.source : "Unknown"}</Td>
                <Td>₹{asset.amount}</Td>
                {operation === "del" ? (
                  <Td>
                    <Button
                      onClick={() => handleDelete(asset._id)}
                      colorScheme="red"
                    >
                      <AiOutlineDelete />
                    </Button>
                  </Td>
                ) : (
                  <Td>
                    <Button onClick={() => handleShowForm(asset)}>Edit</Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UpdateAssets;
