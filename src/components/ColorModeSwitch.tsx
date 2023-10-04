import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Switch, useColorMode } from "@chakra-ui/react";

interface Props {
  isSwitch: boolean;
}

const ColorModeSwitch = ({ isSwitch }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {isSwitch ? (
        <Switch
          colorScheme="purple"
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
        >
          Dark mode
        </Switch>
      ) : (
        <Button variant="unstyled" onClick={toggleColorMode}>
          {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
      )}
    </>
  );
};

export default ColorModeSwitch;
