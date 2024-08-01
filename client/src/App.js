import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="App">
      {!token ? (
        <div>
          {isRegistering ? (
            <div>
              <Register />
              <p>
                Already have an account?{' '}
                <span onClick={toggleRegister} style={{ cursor: 'pointer', color: 'blue' }}>
                  Login here
                </span>
              </p>
            </div>
          ) : (
            <div>
              <Login setToken={handleSetToken} />
              <p>
                Don't have an account?{' '}
                <span onClick={toggleRegister} style={{ cursor: 'pointer', color: 'blue' }}>
                  Register here
                </span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <TodoList token={token} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
