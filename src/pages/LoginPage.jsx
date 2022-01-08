import LoginComponent from '../components/Login/LoginComponent'
import React from 'react'
import { Container } from 'react-bootstrap'
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Container className='card loginComponent'>
        <LoginComponent />
      </Container>
    )
  }
}

export default LoginPage
