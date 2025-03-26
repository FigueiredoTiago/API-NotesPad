// tests/createUser.test.ts
import request from "supertest";

describe("POST /user/create", () => {
  it("Deve retornar status 400 se campos obrigatórios não forem preenchidos", async () => {
    const userData = {
      nick: "", // Falta o nick
      password: "senha123",
    };

    const response = await request("http://localhost:3000")
      .post("/user/create")
      .send(userData);

    expect(response.status).toBe(400); // Verifica se o status é 400 (Bad Request)
    expect(response.text).toBe("Preencha todos os Campos Nick e Senha.");
  });

  it("Deve criar um usuário e retornar status 201", async () => {
    const userData = {
      nick: "usuarioTeste",
      password: "senha123",
    };

    const response = await request("http://localhost:3000")
      .post("/user/create")
      .send(userData);

    expect(response.status).toBe(201); // Verifica se o status é 201 (Criado)
    expect(response.text).toBe("Usuário criado com sucesso!"); // Verifica se a mensagem de retorno é a esperada
  });

  it("Deve Logar o usuário e retornar Nick e Token", async () => {
    const userData = {
      nick: "usuarioTeste",
      password: "senha123",
    };

    try {
      const response = await request("http://localhost:3000")
        .post("/user/login")
        .send(userData);

      expect(response.status).toBe(200);

      expect(response.body).toHaveProperty("nick");
      expect(response.body).toHaveProperty("token");
    } catch (error) {
      console.error("Erro no teste de login:", error);
      throw error;
    }
  });

  it("Deve retornar status 400 se campos obrigatórios não forem preenchidos", async () => {
    const userData = {
      nick: "",
      password: "senha123",
    };

    const response = await request("http://localhost:3000")
      .post("/user/login")
      .send(userData);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Preencha todos os Campos Nick e Senha.");
  });

  it("Deve retornar status 404 se o usuário não existir", async () => {
    const userData = {
      nick: "usuarioInexistente",
      password: "senha123",
    };

    const response = await request("http://localhost:3000")
      .post("/user/login")
      .send(userData);

    expect(response.status).toBe(404);
    expect(response.text).toBe("Usuário não encontrado.");
  });

  it("Deve retornar status 401 se a senha estiver incorreta", async () => {
    const userData = {
      nick: "usuarioTeste",
      password: "senhaIncorreta",
    };

    const response = await request("http://localhost:3000")
      .post("/user/login")
      .send(userData);

    expect(response.status).toBe(401);
    expect(response.text).toBe("Senha Incorreta.");
  });
});
