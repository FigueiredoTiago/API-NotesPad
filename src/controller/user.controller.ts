import { Request, Response } from "express";
import service from "../services/user.service";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//utilitario para Criptografar a senha
import { hashPassword, verifyPassword } from "../utils/passwordCrypt";

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
  } catch (error: any) {
    if (error.code === "P2002") {
      // Erro de constraint única (nickname já existe)
      res
        .status(400)
        .send(`Esse ${error.meta.target} Escolhido já está em uso.`);
    } else {
      // Erro genérico
      res.status(500).send("Erro ao criar o usuário.");
    }
  }
};

//controller para login de usuario:

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const data = req.body;

  //verificar se os campos foram preenchidos
  if (!data.nick || !data.password) {
    res.status(400).send("Preencha todos os Campos Nick e Senha.");
    return;
  }

  try {
    //buscar o usuario no banco
    const user = await service.loginUser(data);

    //verificar se o usuario existe
    if (!user) {
      res.status(404).send("Usuário não encontrado.");
      return;
    }

    //verificar se a senha está correta
    const isPasswordCorrect = await verifyPassword(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      res.status(401).send("Senha Incorreta.");
      return;
    }

    const id = user.id;

    //gerar o token de autenticação

    const token = service.generateToken(id);

    //retornar o token e o nick do usuario
    res.status(200).send({ token, nick: user.nick });
  } catch (error: any) {
    console.error("Erro ao processar login:", error);
    res.status(500).send("Erro ao fazer login.");
  }
};
