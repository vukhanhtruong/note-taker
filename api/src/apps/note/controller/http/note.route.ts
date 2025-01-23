import { CreateNoteHandler } from "./create-note.handler";
import { DeleteNoteHandler } from "./delete-note.handler";
import { GetNotesHandler } from "./get-notes.handler";
import { bearerAuth } from "hono/bearer-auth";
import { verifyToken } from "@utils/jwt";
import { UpdateNoteHandler } from "./update-note.handler";
import { GetNoteByIdHandler } from "./get-note-by-id.handler";

export const noteRoutes = (app) => {
  app.get("/notes", bearerAuth({ verifyToken }), GetNotesHandler);
  app.post("/notes", bearerAuth({ verifyToken }), CreateNoteHandler);
  app.put("/notes", bearerAuth({ verifyToken }), UpdateNoteHandler);
  app.delete("/notes/:id", bearerAuth({ verifyToken }), DeleteNoteHandler);
  app.get("/notes/:id", GetNoteByIdHandler);
};
