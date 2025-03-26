import request from "supertest";

let token: string;
let noteId: number;

beforeAll(async () => {
  await request("http://localhost:3000").post("/user/create").send({
    nick: "usuarioteste",
    password: "senha123",
  });

  // Logar para obter o token
  const response = await request("http://localhost:3000")
    .post("/user/login")
    .send({
      nick: "usuarioteste",
      password: "senha123",
    });

  token = response.body.token;
});

describe("Testes de Notas", () => {
  it("Deve Retornar Status 401 se o Token não for Enviado", async () => {
    const response = await request("http://localhost:3000").get("/note/list");

    expect(response.status).toBe(401);
  });

  it("Deve Criar Uma Nova Nota e Retornar Status 201", async () => {
    const note = {
      title: "Nota de Teste",
      text: "Conteúdo da Nota de Teste",
    };

    const response = await request("http://localhost:3000")
      .post("/note/create")
      .set("Authorization", `Bearer ${token}`)
      .send(note);

    noteId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(note.title);
    expect(response.body.text).toBe(note.text);
  });

  it("Deve Listar Todas as Notas em Um Array e Retornar Status 200", async () => {
    const response = await request("http://localhost:3000")
      .get("/note/list")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  it("Deve Retornar Status 404 se o ID não for Enviado Para Atualizar a Nota", async () => {
    const response = await request("http://localhost:3000")
      .patch("/note/updatenote/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("Deve Retornar Status 400 se o ID da Nota não for um Número", async () => {
    const response = await request("http://localhost:3000")
      .patch("/note/updatenote/abc")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("ID inválido!");
  });

  it("Deve Retornar Status 404 se a Nota não Existir", async () => {
    const note = {
      title: "Nota de Teste Atualizada",
      text: "Conteúdo da Nota de Teste Atualizada",
    };

    const response = await request("http://localhost:3000")
      .patch(`/note/updatenote/999`)
      .set("Authorization", `Bearer ${token}`)
      .send(note);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Nota não encontrada!");
  });

  it("Deve retornar Status 400 se nenhum campo for enviado para atualizar a Nota", async () => {
    const note = {
      title: "",
      text: "",
    };

    const response = await request("http://localhost:3000")
      .patch(`/note/updatenote/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(note);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Preencha pelo menos um Campo...");
  });

  it("Deve Atualizar a Nota e Retornar Status 200", async () => {
    const note = {
      title: "Nota de Teste Atualizada",
      text: "Conteúdo da Nota de Teste Atualizada",
    };

    const response = await request("http://localhost:3000")
      .patch(`/note/updatenote/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(note);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(note.title);
    expect(response.body.text).toBe(note.text);
  });
});
