import noteService from "../services/note.services";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//controller para criar uma nova Nota:
export const createNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, text } = req.body;

  const data = {
    title,
    text,
  };

  if (!title || !text) {
    res.status(400).send({ message: "Preencha todos os campos!" });
    return;
  }

  try {
    const newNote = await noteService.createNote(data);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).send({ message: "Erro ao criar a Nota!" });
  }
};

//controller para listar todas as Notas:

export const listNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes = await noteService.listNotes();
    res.status(200).json({ data: notes });
  } catch (error) {
    res.status(500).send({ message: "Erro ao listar as Notas!" });
  }
};

//controller para listar uma Nota pelo ID:

export const findNoteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido!" });
    return;
  }

  try {
    const note = await noteService.findNoteById(Number(id));

    if (!note) {
      res.status(404).json({ message: "Nota não encontrada!" });
      return;
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar a Nota!" });
  }
};
