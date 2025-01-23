import { useEffect, useRef, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Flex, Input, VStack } from "@chakra-ui/react";
import { Field } from "./ui/field";
import { useColorMode } from "./ui/color-mode";
import { useDebounce, useIsFirstRender } from "@uidotdev/usehooks";
import { useNotes } from "../contexts/NoteContext";
import { ActionsMenu } from "./ActionsMenu";

type Theme = "dark" | "light";

export function TextEditor() {
  const { loading, notes, updateNote, selectedNote } = useNotes();

  const { colorMode } = useColorMode();
  const isFirstRender = useIsFirstRender();
  const skipDebounce = useRef(false);

  const [title, setTitle] = useState<string>();
  const titleDebounce = useDebounce(title, 300);

  const [description, setDescription] = useState<string>();
  const descriptionDebounce = useDebounce(description, 300);

  useEffect(() => {
    skipDebounce.current = true;
  }, [selectedNote]);

  useEffect(() => {
    if (!loading && notes.length && selectedNote !== null) {
      const { title, description } = notes.find((n) => n.id === selectedNote);
      setTitle(title);
      setDescription(description);
    }
  }, [selectedNote]);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }

    if (skipDebounce.current) {
      setTimeout(() => (skipDebounce.current = false));
      return;
    }

    async function storeData() {
      updateNote(selectedNote, {
        title,
        description,
      });
    }

    storeData();
  }, [titleDebounce, descriptionDebounce]);

  return (
    <VStack align="flex-start" height="100%" divideX="20px">
      <Flex justify="space-between" w="full">
        <Field>
          <Input
            w="full"
            autoFocus
            value={title ?? ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>
        <ActionsMenu />
      </Flex>

      <Flex
        justify="space-between"
        w="full"
        height="100vh"
        style={{ borderInlineStart: "0px" }}
        pb="20px"
      >
        <MDEditor
          style={{ width: "100%" }}
          height="100%"
          minHeight={100}
          value={description ?? ""}
          onChange={setDescription}
          data-color-mode={colorMode as Theme}
          textareaProps={{
            placeholder: "Please enter Markdown text",
          }}
        />
      </Flex>
    </VStack>
  );
}
