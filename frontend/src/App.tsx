import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";
import { Router } from "./routes";

function App() {
  return (
    <Center w="100%" minH="dvh">
      <Box
        pos="absolute"
        bottom={{ base: "0px", md: "20px" }}
        left={{ base: "10px", md: "20px" }}
      >
        <ColorModeButton zIndex="1" />
      </Box>
      <VStack w="100%" gap="5">
        <HStack w="100%">
          <Router />
        </HStack>
      </VStack>
    </Center>
  );
}

export default App;
