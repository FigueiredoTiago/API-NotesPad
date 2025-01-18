import { Router } from "express";

import { createNote, listNotes } from "../controller/note.controller";

const router = Router();

//rota para criar uma nova Nota:

router.post("/create", createNote);

//rota para listar todas as Notas:
router.get("/list", listNotes);

export default router;
