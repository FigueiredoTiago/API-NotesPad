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
const deleteNote = async (id: number, userId: number) => {
  return await prisma.note.deleteMany({
    where: {
      id,
      user_id: userId, // Garantir que a nota pertence ao usuário autenticado
    },
  });
};

//service para editar uma nota pelo id:
const updateNote = async (id: number, data: Note, userId: number) => {
  return await prisma.note.update({
    where: {
      id,
      user_id: userId, // Verifica se o usuário é o proprietário da nota
    },
    data: {
      ...data,
      createdAt: new Date(), // Atualiza a data de criação (ou você pode remover isso se não quiser mudar)
    },
  });
};

export default { createNote, listNotes, findNoteById, deleteNote, updateNote };
