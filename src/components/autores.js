import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Autores = () => {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/autores')
      .then(response => {
        setAutores(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter autores:', error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Autores</h1>
      {autores.length > 0 ? (
        <ul>
          {autores.map(autor => (
            <li key={autor.id}>
              <strong>Nome:</strong> {autor.nome} {autor.sobrenome}, {' '}
              <strong>Data de Nascimento:</strong> {autor.dataDeNascimento}
              {autor.livros.length > 0 && (
                <ul>
                  <strong>Livros:</strong>
                  {autor.livros.map(livro => (
                    <li key={livro.id}>
                      <strong>Título:</strong> {livro.titulo}, {' '}
                      <strong>Ano de Publicação:</strong> {livro.anoPublicacao}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum autor encontrado.</p>
      )}
    </div>
  );
};

export default Autores;
