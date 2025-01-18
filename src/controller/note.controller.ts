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

//controller para deletar uma Nota pelo ID:

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido!" });
    return;
  }

  try {
    const checkNote = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!checkNote) {
      res.status(404).json({ message: "Nota não encontrada!" });
      return;
    }

    await noteService.deleteNote(Number(id));
    res.status(200).json("Nota deletada com sucesso!");
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar a Nota!" });
  }
};

//controller para editar uma Nota pelo ID:

export const updateNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const data = req.body;

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido!" });
    return;
  }

  if (!data.title && !data.text) {
    res.status(400).json({ error: "Preencha pelo menos um Campo..." });
    return;
  }

  try {
    const checkNote = await prisma.note.findUnique({
      where: { id: Number(id) },
    });

    if (!checkNote) {
      res.status(404).json({ message: "Nota não encontrada!" });
      return;
    }

    const updatedNote = await noteService.updateNote(Number(id), data);

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).send({ message: "Erro ao editar a Nota!" });
  }
};
