// tests/createUser.test.ts
import request from "supertest";
import app from "../src/index";

describe("POST /user/create", () => {
  it("Deve criar um usuário e retornar status 201", async () => {
    const userData = {
      nick: `usuarioTeste_${Date.now()}`,
      password: "senha123",
    };

    const response = await request(app).post("/user/create").send(userData);

    expect(response.status).toBe(201); // Verifica se o status é 201 (Criado)
    expect(response.text).toBe("Usuário criado com sucesso!"); // Verifica se a mensagem de retorno é a esperada
  });

  it("Deve retornar status 400 se campos obrigatórios não forem preenchidos", async () => {
    const userData = {
      nick: "", // Falta o nick
      password: "senha123",
    };

    const response = await request(app).post("/user/create").send(userData);

    expect(response.status).toBe(400); // Verifica se o status é 400 (Bad Request)
    expect(response.text).toBe("Preencha todos os Campos Nick e Senha.");
  });
});
