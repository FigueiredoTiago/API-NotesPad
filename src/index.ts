import express, { Request, Response } from "express";
import noteRoutes from "./routes/note.routes";
import userRoutes from "./routes/user.routes";

import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Tudo Certo Por Aqui, Continue o Bom Trabalho!");
});

app.use("/note", noteRoutes);
app.use("/user", userRoutes);

export default app;
