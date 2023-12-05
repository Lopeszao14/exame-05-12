import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Fazer a chamada para o endpoint de login no backend
    axios.post('http://localhost:3000/login', data)
      .then((response) => {
        // Se o login for bem-sucedido, chame a função onLogin
        console.log(response.data); // Exemplo: Exibindo a resposta do servidor
        onLogin();
      })
      .catch((error) => {
        // Se ocorrer um erro, lide com o erro (pode mostrar uma mensagem de erro no frontend)
        console.error('Erro ao fazer login:', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input type="text" name="username" ref={register} />
        </label>
        <label>
          Password:
          <input type="password" name="password" ref={register} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
