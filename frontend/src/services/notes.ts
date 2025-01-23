import { Note } from "@/contexts/NoteContext";
import axios from "../helpers/axios";

const add = async (data: Note) => {
  const response = await axios("/v1/notes", {
    method: "POST",
    data,
  });

  return response;
};

const save = async (data: Note) => {
  const response = await axios("/v1/notes", {
    method: "PUT",
    data,
  });
  return response;
};

const del = async (id: string) => {
  const response = await axios(`v1/notes/${id}`, {
    method: "DELETE",
  });
  return response;
};

const getById = async (id: string): Promise<Note> => {
  const response = await axios.get(`/v1/notes/${id}`);
  const { result } = response.data;
  return result;
};

const getAll = async (): Promise<Note[]> => {
  const response = await axios.get("/v1/notes?page=1");
  const { result } = response.data;
  return result;
};

export const noteAPI = { add, save, getAll, getById, del };
