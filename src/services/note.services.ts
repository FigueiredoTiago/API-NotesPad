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
  return await prisma.note.findMany();
};


//service para listar uma Nota pelo ID:

const findNoteById = async (id: number) => {
  return await prisma.note.findUnique({
    where: {
      id,
    },
  });
};

export default { createNote, listNotes, findNoteById };
