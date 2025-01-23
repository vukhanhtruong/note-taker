import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Heading,
  Separator,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import MDEditor from "@uiw/react-md-editor";
import { noteAPI } from "../services/notes";

export const Share: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract 'id' from the URL
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        if (id) {
          const note = await noteAPI.getById(id);
          setTitle(note.title);
          setDescription(note.description);
        } else {
          throw new Error("No ID provided in the URL");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <p>Error: {error}</p>
      </Container>
    );
  }

  return (
    <Container mt="-100px">
      <Heading size="5xl">{title}</Heading>
      <Separator />
      <br />
      <Stack>
        <MDEditor.Markdown
          source={description}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </Stack>
    </Container>
  );
};
