import { inject, injectable } from "tsyringe";
import { Note } from "../../domain/entity/note";
import { AppToken } from "../../../app.token";
import { PrismaClient } from "@prisma/client";
import { NoteMapper } from "./note.mapper";
import { NoteRepository } from "@apps/note/domain/port/persistence/repository";
import { UniqueID } from "@core/unique-id";

injectable();
export class NoteRepositoryImplement implements NoteRepository {
  constructor(@inject(AppToken.ORM_CLIENT) private orm: PrismaClient) {}

  async createNewNote(note: Note): Promise<Note> {
    const newNote = await this.orm.note.create({
      data: NoteMapper.toORM(note),
    });

    return NoteMapper.toDomain(newNote);
  }

  async updateNote(updateNote: Note): Promise<Note> {
    const transform = NoteMapper.toORM(updateNote);
    const note = await this.orm.note.update({
      data: transform,
      where: {
        id: transform.id,
      },
    });

    return NoteMapper.toDomain(note);
  }

  async deleteNote(id: UniqueID): Promise<Note> {
    const deleteItem = await this.orm.note.delete({
      where: {
        id: id.toValue(),
      },
    });
    return NoteMapper.toDomain(deleteItem);
  }

  async getNotesByUserId(userId: UniqueID): Promise<Note[]> {
    const notes = await this.orm.note.findMany({
      where: {
        createdBy: userId.toValue(),
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return notes.map((note) => NoteMapper.toDomain(note));
  }

  async getNoteById(id: UniqueID): Promise<Note | null> {
    const note = await this.orm.note.findFirst({
      where: {
        id: id.toValue(),
      },
    });

    return note ? NoteMapper.toDomain(note) : null;
  }
}
