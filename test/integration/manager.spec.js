//subir o servidor no supertest
//criar variavel de ambiente para rodar o teste no bd de teste
const request = require("supertest");
const app = require("../../src/app"); // o app para o supertest rodar o servidor
const connection = require("../../src/database");
const { cpf } = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () => {
  // feche a conexão depois do teste
  afterAll(() => {
    connection.close();
  });

  beforeAll(async (done) => {
    await truncate(connection.models);
    done();
  });

  it("é possivel criar um novo gerente", async () => {
    const response = await request(app).post("/managers").send({
      name: "João Lucas",
      cpf: cpf.generate(),
      email: "teste@gmail.com",
      cellphone: "5519998208012",
      password: "12345678",
    });
    expect(response.ok).toBeTruthy(); // esperando que a resposta seja verdadeira
    expect(response.body).toHaveProperty("id");
  });

  it("não é possivel cadastrar um gerente com cpf existente", async () => {
    let cpfGerente = cpf.generate();
    let response = await request(app).post("/managers").send({
      name: "João Lucas P",
      cpf: cpfGerente,
      email: "teste1@gmail.com",
      cellphone: "5519998208012",
      password: "12345678",
    });

    response = await request(app).post("/managers").send({
      name: "João Lucas P1",
      cpf: cpfGerente,
      email: "teste2@gmail.com",
      cellphone: "5519298508012",
      password: "12345678",
    });

    expect(response.ok).toBeFalsy();
    expect(response.body).toHaveProperty("error");
  });
});
