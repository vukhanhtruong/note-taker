import { Note, useNotes } from "@/contexts/NoteContext";
import { Float, IconButton, Input, Link, List } from "@chakra-ui/react";
import { useDebounce } from "@uidotdev/usehooks";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { SlNote } from "react-icons/sl";

const fuzzySearch = (searchTerm: string, notes: Note[]) => {
  const options = {
    keys: ["title"],
  };

  if (!searchTerm) return notes;

  const fuse = new Fuse(notes, options);
  const result = fuse.search(searchTerm);
  return result.map((item) => item.item);
};

export function Sidebar() {
  const { addNote, selectedNote, notes, setSelectedNote } = useNotes();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const searchDebounce = useDebounce(searchTerm, 100);

  useEffect(() => {
    setFilteredNotes(fuzzySearch(searchTerm, notes));
  }, [searchDebounce, notes]);

  const onNewNote = () => {
    setSearchTerm("");

    addNote({
      title: "",
      description: "",
    });
  };

  return (
    <>
      <Input
        placeholder="Search all compositions"
        mb="4"
        value={searchTerm ?? ""}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Float offsetY="20" offsetX="9">
        <IconButton
          aria-label="New Note"
          onClick={() => onNewNote()}
          variant="outline"
          size="sm"
        >
          <SlNote />
        </IconButton>
      </Float>
      <List.Root marginTop="30px" cursor="pointer">
        {filteredNotes?.length > 0 &&
          filteredNotes?.map((note, index) => {
            return (
              <List.Item
                key={index}
                p="5px 0px"
                onClick={() => setSelectedNote(note.id)}
              >
                <Link
                  outlineWidth="0"
                  style={{
                    fontWeight: note.id === selectedNote ? "bold" : "normal",
                  }}
                  href="#"
                >
                  {note?.title?.length > 33
                    ? `${note?.title.substring(0, 33)}...`
                    : (note?.title ?? "")}
                </Link>
              </List.Item>
            );
          })}
      </List.Root>
    </>
  );
}
