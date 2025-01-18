import express, { Request, Response } from "express";

import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Tudo Certo Por Aqui, Continue o Bom Trabalho!");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
