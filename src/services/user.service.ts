import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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


export default { createUser };