import { Box, Flex, VStack } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar";
import { TextEditor } from "@/components/TextEditor";
import { Toaster } from "@/components/ui/toaster";

export function Dashboard() {
  return (
    <VStack w="100%" spaceX={4}>
      <Flex
        w="100%"
        height={{ base: "auto", md: "100vh" }}
        direction={{ base: "column", md: "row" }}
        overflow="hidden"
      >
        <Box w={{ base: "100%", md: "20%" }} p="4" position="relative">
          <Sidebar />
        </Box>
        <Box flex="1" p="4" w={{ base: "100%", md: "80%" }}>
          <TextEditor />
        </Box>
        <Toaster />
      </Flex>
    </VStack>
  );
}
