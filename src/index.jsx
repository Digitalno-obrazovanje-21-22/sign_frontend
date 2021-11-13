import React from 'react'
import ReactDOM from 'react-dom'
import { AuthRouter } from './pages/AuthRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthContextProvider } from './store/auth-context'

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <AuthRouter />
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById('root'),
)
