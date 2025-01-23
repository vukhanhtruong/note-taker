import { toaster } from "@/components/ui/toaster";
import { noteAPI } from "@/services/notes";
import { AxiosResponse } from "axios";
import React, { useEffect, useState, createContext, useContext } from "react";
import { faker } from "@faker-js/faker";
import { usePrevious } from "@uidotdev/usehooks";

export interface Note {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  description?: string;
  archived?: boolean;
}

interface NoteContextProps {
  notes: Note[];
  deleteNote: (id: string) => Promise<AxiosResponse>;
  addNote: (data: { title: string; description: string }) => void;
  updateNote: (
    id: string,
    newContent: { title: string; description: string },
  ) => Promise<AxiosResponse>;
  loading: boolean;
  selectedNote: string;
  setSelectedNote: (id: string) => void;
}

const NoteContext = createContext<NoteContextProps | undefined>(undefined);

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const previousNotes = usePrevious(notes);

  const [selectedNote, setSelectedNote] = useState<string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const notes = await noteAPI.getAll();
        setNotes(notes);
      } catch (error) {
        console.error("Error fetching notes: ", error);
        toaster.create({
          title: "Something went wrong!",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      setSelectedNote((prevSelectedNote) => prevSelectedNote || notes[0]?.id);
    }
    if (notes.length > previousNotes?.length) {
      setSelectedNote(notes[notes.length - 1].id);
    }
  }, [notes, previousNotes]);

  useEffect(() => {
    if (loading === false && notes.length === 0) {
      addNote({
        title: "",
        description: "",
      });
    }
  }, [notes, loading]);

  const addNote = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    const randomTitle = title.length ? title : faker.book.title();
    const newNote = await noteAPI.add({ title: randomTitle, description });

    setNotes((prevNotes) => [...prevNotes, newNote.data.result]);
  };

  const updateNote = async (
    id: string,
    payload: { title: string; description: string },
  ): Promise<AxiosResponse> => {
    try {
      const updatedNote = notes.find((n) => n.id === id);
      const updatedNoteIndex = notes.findIndex((n) => n.id === id);

      const data = { ...updatedNote, ...payload };

      const updatedData = [...notes];
      updatedData[updatedNoteIndex] = data;

      setNotes(updatedData);

      return noteAPI.save(data);
    } catch (error) {
      console.error("Error update note: ", error);
      toaster.create({
        title: "Something went wrong!",
        description: error.message,
        type: "error",
      });
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await noteAPI.del(id);

      setNotes(notes.filter((n) => n.id !== id));

      return response;
    } catch (e) {
      toaster.create({
        title: "Something went wrong",
        description: e.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <NoteContext.Provider
        value={{
          notes,
          updateNote,
          deleteNote,
          addNote,
          loading,
          selectedNote,
          setSelectedNote,
        }}
      >
        {children}
      </NoteContext.Provider>
    </>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};
