import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Box } from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { LuShare, LuTrash } from "react-icons/lu";
import { DeleteDialog } from "./DeleteDialog";
import { ShareDialog } from "./ShareDialog";

export const ActionsMenu = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="plain" border="none" outline="none" size="sm">
          <HiDotsVertical />
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuItem value="cut" valueText="cut">
          <LuShare />
          <ShareDialog>
            <Box flex="1">Share</Box>
          </ShareDialog>
        </MenuItem>
        <MenuItem color="red" value="delete" valueText="delete">
          <LuTrash />
          <DeleteDialog>
            <Box flex="1">Delete</Box>
          </DeleteDialog>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
