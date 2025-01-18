import { Router } from "express";

import { createNote, listNotes, findNoteById, deleteNote } from "../controller/note.controller";

const router = Router();

//rota para criar uma nova Nota:

router.post("/create", createNote);

//rota para listar todas as Notas:
router.get("/list", listNotes);


//rota para listar uma Nota pelo ID:

router.get("/findnote/:id", findNoteById);

//rota para deletar uma Nota pelo ID:
router.delete("/deletenote/:id", deleteNote);


export default router;
