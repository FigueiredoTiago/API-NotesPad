import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Limpar o banco de dados antes de cada teste
beforeEach(async () => {
  // Limpar as tabelas 'user' e 'note' (adicione outras tabelas conforme necessário)
  await prisma.note.deleteMany({});
  await prisma.user.deleteMany({});
});

// Fechar a conexão com o Prisma após todos os testes
afterAll(async () => {
  await prisma.$disconnect();
});
