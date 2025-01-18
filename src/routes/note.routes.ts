import { Router } from "express";

import { createNote, listNotes, findNoteById } from "../controller/note.controller";

const router = Router();

//rota para criar uma nova Nota:

router.post("/create", createNote);

//rota para listar todas as Notas:
router.get("/list", listNotes);


//rota para listar uma Nota pelo ID:

router.get("/findnote/:id", findNoteById);
export default router;
