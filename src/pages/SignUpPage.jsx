import SignUpComponent from '../components/SignUp/SignUpComponent'
import React from 'react'
import { Container } from 'react-bootstrap'
class SignUpPage extends React.Component {
  render() {
    return (
      <Container className='card loginComponent'>
        <SignUpComponent />
      </Container>
    )
  }
}

export default SignUpPage
