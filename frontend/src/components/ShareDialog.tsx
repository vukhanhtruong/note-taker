import { Input, Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { useRef } from "react";
import { useNotes } from "@/contexts/NoteContext";

const getFullDomain = () => {
  return `${window.location.protocol}//${window.location.hostname}`;
};

export const ShareDialog = ({ children }: { children: JSX.Element }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { selectedNote } = useNotes();

  return (
    <DialogRoot initialFocusEl={() => ref.current}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Note</DialogTitle>
        </DialogHeader>
        <DialogBody pb="4">
          <Stack gap="4">
            <Field label="Link">
              <Input
                ref={ref}
                readOnly
                value={`${getFullDomain()}/share/${selectedNote}`}
                placeholder="Link"
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Close</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
