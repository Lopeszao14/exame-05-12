import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AutoresPage from './pages/AutoresPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <LoginPage onLogin={handleLogin} />
          </Route>
          <Route path="/autores">
            {isLoggedIn ? <AutoresPage /> : <LoginPage onLogin={handleLogin} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
