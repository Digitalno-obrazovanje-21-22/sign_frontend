import React from 'react'
import ReactDOM from 'react-dom'
import { AuthRouter } from './pages/AuthRouter'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthContextProvider } from './store/auth-context'
import { RoomContextProvider } from './store/room-context'


ReactDOM.render(
  <AuthContextProvider>
    <RoomContextProvider>
      <React.StrictMode>
        <AuthRouter />
      </React.StrictMode>
    </RoomContextProvider>
  </AuthContextProvider>,
  document.getElementById('root'),
)
