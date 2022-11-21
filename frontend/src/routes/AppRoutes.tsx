import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Account from '../pages/Accout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Transaction from '../pages/Transaction';

const App: React.FC = () => {
  return useRoutes([
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/account', element: <Account /> },
    { path: '/transaction', element: <Transaction /> }
  ]);
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRoutes;