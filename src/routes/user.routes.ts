import { Router } from "express";
import { createUser, loginUser } from "../controller/user.controller";

const router = Router();

//criar um usuario
router.post("/create", createUser);

//rota para login de usuario
router.post("/login", loginUser);

export default router;
