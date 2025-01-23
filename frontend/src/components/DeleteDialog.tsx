import { Button } from "@/components/ui/button";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNotes } from "@/contexts/NoteContext";
import { toaster } from "./ui/toaster";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

export const DeleteDialog = ({ children }: { children: JSX.Element }) => {
  const { deleteNote, selectedNote } = useNotes();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    const response = await deleteNote(selectedNote);
    setIsOpen(false);

    if (response?.status === 200) {
      toaster.create({
        title: "Note deleted!",
      });
    }
  };

  return (
    <DialogRoot open={isOpen} role="alertdialog">
      <Box onClick={() => setIsOpen(true)} flex="1">
        {children}
      </Box>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our systems.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={() => handleDelete()} colorPalette="red">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
