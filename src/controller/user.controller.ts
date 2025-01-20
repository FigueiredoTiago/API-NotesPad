import { Request, Response } from "express";
import service from "../services/user.service";

//utilitario para Criptografar a senha
import { hashPassword } from "../utils/passwordCrypt";

//controller para criar um usuario:
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;

  //verificar se os campos foram preenchidos
  if (!data.nick || !data.password) {
    res.status(400).send("Preencha todos os Campos Nick e Senha.");
    return;
  }

  //criptografar a senha
  const cryptPassword = await hashPassword(data.password);

  //criar o usuario
  try {
    await service.createUser({ ...data, password: cryptPassword });
    res.status(201).send("Usuário criado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao criar o usuário.");
  }
};
