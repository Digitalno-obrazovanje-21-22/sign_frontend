import React from 'react';
import ReactDOM from 'react-dom';
import { AuthRouter } from './pages/AuthRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthRouter/>
  </React.StrictMode>,
  document.getElementById('root')
);

