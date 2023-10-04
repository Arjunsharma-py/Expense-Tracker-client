import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const DisplayContainer = ({ children }: Props) => {
  return (
    <Box as="main" borderRadius={10} overflow="hidden" pt={16}>
      {children}
    </Box>
  );
};

export default DisplayContainer;
