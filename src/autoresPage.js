import React from 'react';
import Autores from '../components/Autores';

const AutoresPage = ({ isLoggedIn }) => {
  return (
    <div>
      <h1>Autores Page</h1>
      {isLoggedIn ? <Autores /> : <p>Faça login para acessar esta página.</p>}
    </div>
  );
};

export default AutoresPage;
