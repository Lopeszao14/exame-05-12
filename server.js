const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

const data = [
  {
    id: 1,
    nome: "Clarice",
    sobrenome: "Lispector",
    dataDeNascimento: "10/12/1920",
    livros: [
      {
        id: 1,
        titulo: "A Hora da Estrela",
        descricao:
          "Um dos últimos livros escritos por Clarice, narrando a vida e os pensamentos de Macabéa.",
        anoPublicacao: 1977,
      },
      {
        id: 2,
        titulo: "Perto do Coração Selvagem",
        descricao:
          "Primeiro romance de Clarice, publicado quando ela tinha apenas 23 anos, trazendo uma nova abordagem para a literatura brasileira.",
        anoPublicacao: 1943,
      },
    ],
  },
];

const middlewares = {
  autorExistente: function (req, res, next) {
    const { nome, sobrenome } = req.body;

    const validacao = data.find(
      (a) => a.nome == nome && a.sobrenome == sobrenome
    );

    if (!validacao) next();
    res.status(409);
    res.json(`O autor ${nome} ${sobrenome} já existe.`);
  },

  livroExistente: function (req, res, next) {
    const { id } = req.params;
    const { titulo } = req.body;

    const validacao = data
      .find((a) => a.id == id)
      .livros.find((a) => a.titulo == titulo);
    if (!validacao) next();
    res.status(409);
    res.json(`O livro ${titulo} já existe.`);
  },

  idAutorExistente: function (req, res, next) {
    const { id } = req.params;

    const validacao = data.find((a) => a.id == id);
    if (validacao) next();
    res.status(404).send("Autor não encontrado, ID não existe.");
  },

  postAutor: function (req, res, next) {
    const { id, nome, sobrenome, dataDeNascimento, livros } = req.body;

    if (id && nome && sobrenome && dataDeNascimento && livros) next();
    res.status(400).send("Dados incompletos do autor.");
  },

  postLivro: function (req, res, next) {
    const { id, titulo, descricao, anoPublicacao } = req.body;

    if (id && titulo && descricao && anoPublicacao) next();
    res.status(400).send("Dados incompletos do livro.");
  },
};

app.get("/autores", (req, res) => {
  res.json(data);
});

app.post(
  "/autores",
  middlewares.postAutor,
  middlewares.autorExistente,
  (req, res) => {
    const autorNovo = req.body;
    data.push(autorNovo);
    res.status(201);
    res.json(autorNovo);
  }
);

app.get("/autores/:id", (req, res) => {
  const { id } = req.params;

  let resultado = data.find((a) => a.id == id);

  if (resultado) res.json(resultado);
  res.status(404).send("Autor não encontrado, ID não existe.");
});

app.put("/autores/:id", (req, res) => {
  const { id } = req.params;
  const novoAutor = req.body;

  let idx = data.findIndex((a) => a.id == id);

  if (idx === -1) {
    res.status(404).send("Autor não encontrado, ID não existe.");
  } else {
    data.splice(idx, 1, novoAutor);
    res.status(200).json(data[idx]);
  }
});

app.delete("/autores/:id", (req, res) => {
  const { id } = req.params;

  let idx = data.findIndex((a) => a.id == id);

  if (idx === -1) {
    res.status(404).send("Autor não encontrado, ID não existe.");
  } else {
    data.splice(idx, 1);
    res.status(204).send("Autor deletado.");
  }
});

app.get("/autores/:id/livros", middlewares.idAutorExistente, (req, res) => {
  const { id } = req.params;

  let idx = data.findIndex((a) => a.id == id);
  res.json(data[idx].livros);
});

app.post('/src/components/login', (req, res) => {
  // Lógica de autenticação (verifique as credenciais, por exemplo)
  const { username, password } = req.body;

  // Exemplo básico de verificação (não recomendado para produção)
  if (username === 'usuario' && password === 'senha') {
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

app.post(
  "/autores/:id/livros",
  middlewares.idAutorExistente,
  middlewares.livroExistente,
  middlewares.postLivro,

  (req, res) => {
    const novoLivro = req.body;
    const { id } = req.params;

    let idx = data.findIndex((a) => a.id == id);

    data[idx].livros.push(novoLivro);
    res.status(201).json(novoLivro);
  }
);

app.get(
  "/autores/:id/livros/:idLivro",
  middlewares.idAutorExistente,
  (req, res) => {
    const { id, idLivro } = req.params;

    const resultado = data
      .find((a) => a.id == id)
      .livros.find((a) => a.id == idLivro);

    if (resultado) res.json(resultado);
    res.status(404).send("Livro não encontrado.");
  }
);

app.put(
  "/autores/:id/livros/:idLivro",
  middlewares.idAutorExistente,
  (req, res) => {
    const { id, idLivro } = req.params;
    const novoLivro = req.body;

    let idx;

    let resultado = data
      .find((a) => a.id == id)
      .livros.filter((libro, index) => {
        if (libro.id == idLivro) {
          idx = index;
          return libro.id == idLivro;
        }
      });

    if (resultado.length === 0) {
      res.status(404).send("Livro não encontrado.");
    } else {
      data[idx].livros.splice(idx, 1, novoLivro);
      res.json(novoLivro);
    }
  }
);

app.get('/login', (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname, 'login'));
});

app.delete(
  "/autores/:id/livros/:idLivro",
  middlewares.idAutorExistente,
  (req, res) => {
    const { id, idLivro } = req.params;
    let idx;

    let resultado = data
      .find((a) => a.id == id)
      .livros.filter((libro, index) => {
        if (libro.id == idLivro) {
          idx = index;
          return libro.id == idLivro;
        }
      });

    if (resultado.lenght === 0) {
      res.status(404).send("Livro não encontrado.");
    } else {
      data[idx].livros.splice(idx, 1);
      res.status(204).send("Livro deletado.");
    }
  }
);

app.listen(3000, () => {
  console.log("Servidor iniciado");
});

module.exports = app;
