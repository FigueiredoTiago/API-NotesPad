import noteService from "../services/note.services";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: number; // Adiciona o campo userId ao objeto Request/, usar em rotas autenticadas
}

//controller para criar uma nova Nota:
export const createNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { title, text } = req.body;

  //pegando o id do usuário autenticado
  const userId = req.userId;

  //validação dos campos

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado!" });
    return;
  }

  if (!title || !text) {
    res.status(400).send({ message: "Preencha todos os campos!" });
    return;
  }

  const data = {
    title,
    text,
    userId,
  };

  try {
    const newNote = await noteService.createNote(data);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).send({ message: "Erro ao criar a Nota!" });
  }
};

//controller para listar todas as Notas:

export const listNotes = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId; //pegar o id do usuário autenticado
  //validação do id do usuário

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado!" });
    return;
  }
  try {
    const notes = await noteService.listNotes(userId);
    res.status(200).json({ data: notes });
  } catch (error) {
    res.status(500).send({ message: "Erro ao listar as Notas!" });
  }
};

//controller para listar uma Nota pelo ID:

export const findNoteById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const userId = req.userId; //pegar o id do usuário autenticado

  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido!" });
    return;
  }

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado!" });
    return;
  }

  try {
    const note = await noteService.findNoteById(Number(id), Number(userId));

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
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const userId = req.userId; //pegar o id do usuário autenticado

  if (!id) {
    res.status(404).json({ error: "ID Não Fornecido!" });
    return;
  }

  if (isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido!" });
    return;
  }

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado!" });
    return;
  }

  try {
    const checkNote = await prisma.note.findUnique({
      where: {
        id: Number(id),
        user_id: userId,
      },
    });

    if (!checkNote) {
      res.status(404).json({ message: "Nota não encontrada!" });
      return;
    }

    await noteService.deleteNote(Number(id), Number(userId));

    res.status(200).json({ message: "Nota deletada com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar a Nota!" });
  }
};

//controller para editar uma Nota pelo ID:

export const updateNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.userId; //pegar o id do usuário autenticado
  const data = req.body;

  if (!id) {
    res.status(404).json({ error: "ID Não Fornecido!" });
    return;
  }

  if (isNaN(Number(id))) {
    res.status(400).json({ error: "ID inválido!" });
    return;
  }

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado!" });
    return;
  }

  if (!data.title && !data.text) {
    res.status(400).json({ error: "Preencha pelo menos um Campo..." });
    return;
  }

  try {
    const checkNote = await prisma.note.findUnique({
      where: { id: Number(id), user_id: userId },
    });

    if (!checkNote) {
      res.status(404).json({ message: "Nota não encontrada!" });
      return;
    }

    const updatedNote = await noteService.updateNote(
      Number(id),
      data,
      Number(userId)
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).send({ message: "Erro ao editar a Nota!" });
  }
};

//controller para Buscar uma Nota pelo Titulo:

export const searchNote = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { title } = req.query;
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Usuário não autenticado!" });
    return;
  }

  if (!title) {
    res.status(400).json({ message: "Título não fornecido!" });
    return;
  }

  try {
    const notes = await noteService.searchNote(String(title), Number(userId));

    if (notes.length === 0) {
      res.status(404).json({ message: "Nenhuma nota encontrada!" });
      return;
    }

    res.status(200).json({ data: notes });
  } catch (error) {
    res.status(500).send({ message: "Erro ao buscar a Nota!" });
  }
};
