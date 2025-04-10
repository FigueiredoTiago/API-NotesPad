import { Router } from "express";

import {
  createNote,
  listNotes,
  findNoteById,
  deleteNote,
  updateNote,
  searchNote,
} from "../controller/note.controller";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

//rota para criar uma nova Nota:
router.post("/create", authMiddleware, createNote);

//rota para listar todas as Notas:
router.get("/list", authMiddleware, listNotes);

//rota para listar uma Nota pelo ID:

router.get("/findnote/:id", authMiddleware, findNoteById);

//rota para deletar uma Nota pelo ID:
router.delete("/deletenote/:id", authMiddleware, deleteNote);

//rota para editar uma Nota pelo ID:
router.patch("/updatenote/:id", authMiddleware, updateNote);

//rota para Buscar uma Nota pelo Titulo por Query Params:

router.get("/searchnote", authMiddleware, searchNote);

export default router;
