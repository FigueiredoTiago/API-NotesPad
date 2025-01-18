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

//servico para listar todas as Notas:

const listNotes = async () => {
  return await prisma.note.findMany();
};

export default { createNote, listNotes };
