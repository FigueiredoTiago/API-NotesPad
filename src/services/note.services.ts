import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//types para a Nota:

type Note = {
  title: string;
  text: string;
  userId: number;
};

//service para criar uma nova Nota ja com o id do usuário autenticado:
const createNote = async (data: Note) => {
  return await prisma.note.create({
    data: {
      title: data.title,
      text: data.text,
      user: {
        connect: { id: data.userId },
      },
    },
  });
};

// Service para listar notas de um usuário específico
const listNotes = async (userId: number) => {
  return await prisma.note.findMany({
    where: {
      user_id: userId, // Filtra as notas pelo ID do usuário
    },
    orderBy: {
      createdAt: "desc", // Ordena pela data de criação em ordem decrescente
    },
  });
};

//service para listar uma Nota pelo ID:

const findNoteById = async (id: number) => {
  return await prisma.note.findUnique({
    where: {
      id,
    },
  });
};

//service para deletar uma nota pelo id:

const deleteNote = async (id: number) => {
  return await prisma.note.delete({
    where: {
      id,
    },
  });
};

//service para editar uma nota pelo id:
const updateNote = async (id: number, data: Note) => {
  return await prisma.note.update({
    where: {
      id,
    },
    data: {
      ...data,
      createdAt: new Date(),
    },
  });
};

export default { createNote, listNotes, findNoteById, deleteNote, updateNote };
