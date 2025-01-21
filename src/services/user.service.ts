import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

//type para user

type User = {
  nick: string;
  password: string;
};

const createUser = async (data: User) => {
  return await prisma.user.create({
    data,
  });
};

//service para login de usuario

const loginUser = async (data: User) => {
  return await prisma.user.findUnique({
    where: {
      nick: data.nick,
    },
  });
};

//service para gerar token jwt com id do usuario
export const generateToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export default { createUser, loginUser, generateToken };
