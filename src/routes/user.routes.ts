import { Router } from "express";
import { createUser } from "../controller/user.controller";


const router = Router();

//criar um usuario
router.post("/create", createUser);

export default router;