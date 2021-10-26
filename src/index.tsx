import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AuthRouter } from './pages/AuthRouter';

ReactDOM.render(
  <React.StrictMode>
    <AuthRouter/>
  </React.StrictMode>,
  document.getElementById('root')
);

