import { DateTime, Str } from "chanfana";
import { z } from "zod";
import { CreateNoteProps } from "../../../domain/entity/note";

export const NoteSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
  title: Str({ example: "lorem", required: true }),
  description: Str({ required: false }).optional(),
  archived: z.boolean().default(false),
}) as z.ZodType<CreateNoteProps>;

export type NoteModel = z.infer<typeof NoteSchema>;

export const CreateNoteSchema = z.object({
  title: Str({ required: true }).min(1, "Note title is required"),
  description: Str({ required: false }).optional(),
  archived: z.boolean().default(false),
}) as z.ZodType<CreateNoteProps>;

export const UpdateNoteSchema = z.object({
  id: Str({ required: true }).min(1, "Note Id is required"),
  title: Str({ required: true }).min(1, "Note title is required"),
  description: Str({ required: false }).optional(),
  archived: z.boolean().default(false),
}) as z.ZodType<CreateNoteProps>;
