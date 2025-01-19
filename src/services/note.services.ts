import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//types para a Nota:

type Note = {
  title: string;
  text: string;
};

//service para criar uma nova Nota:
const createNote = async (data: Note) => {
  return await prisma.note.create({
    data,
  });
};

//service para listar todas as Notas:
const listNotes = async () => {
  return await prisma.note.findMany({
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
