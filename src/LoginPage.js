import React from 'react';
import Login from '../components/Login';

const LoginPage = ({ onLogin }) => {
  return (
    <div>
      <h1>Login Page</h1>
      <Login onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
