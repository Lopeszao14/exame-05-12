const request = require("supertest");
const app = require("./server");

describe("Testes para o endpoint /autores", () => {
  it("GET /autores retorna a lista de autores", () => {
    return request(app)
      .get("/autores")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it("POST /autores cria um novo autor", () => {
    const novoAutor = {
      id: 2,
      nome: "Novo",
      sobrenome: "Autor",
      dataDeNascimento: "01/01/2000",
      livros: [],
    };

    return request(app)
      .post("/autores")
      .send(novoAutor)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(novoAutor);
      });
  });

  it("GET /autores/:id retorna um autor específico", () => {
    return request(app)
      .get("/autores/1")
      .expect(200)
      .then((response) => {
        expect(response.body.id).toBe(1);
      });
  });

  it("PUT /autores/:id atualiza um autor existente", () => {
    const autorAtualizado = {
      id: 1,
      nome: "Clarice",
      sobrenome: "Lispector",
      dataDeNascimento: "10/12/1920",
      livros: [
        {
          id: 3,
          titulo: "Outro Livro",
          descricao: "Descrição do outro livro.",
          anoPublicacao: 2000,
        },
      ],
    };
  
    return request(app)
      .put("/autores/1")
      .send(autorAtualizado)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(autorAtualizado);
      });
  });  

  it("DELETE /autores/:id deleta um autor existente", () => {
    return request(app).delete("/autores/1").expect(204);
  });
});
