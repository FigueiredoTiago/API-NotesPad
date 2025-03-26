import { PrismaClient } from "@prisma/client";
import app from "./src/index";

const prisma = new PrismaClient();
let server: any;

beforeAll(async () => {
  // Inicializar o servidor
  server = app.listen(3000);

  //preparação necessária no banco de dados
  await prisma.user.deleteMany({});
  await prisma.note.deleteMany({});
});

afterAll(async () => {
  // Fechar o servidor após todos os testes
  await new Promise<void>((resolve) => {
    server.close(() => {
      resolve();
    });
  });

  // Limpar o banco de dados
  await prisma.user.deleteMany({});
  await prisma.note.deleteMany({});

  // Desconectar do Prisma
  await prisma.$disconnect();
});
