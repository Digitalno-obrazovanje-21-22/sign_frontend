import React, { ReactChildren, ReactChild } from 'react'
import { Container, Nav, Navbar, Button, Image } from 'react-bootstrap'
import logo from '../../assets/signsWhiteLogo.png' 

interface LayoutProps {
  children: ReactChild | ReactChildren
}

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
          <img src={logo} width='70' height='70' className='d-inline-block align-top' />
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/recording'>Recording</Nav.Link>
          <Nav.Link href='/sign-in'>Log in</Nav.Link>
          <Nav.Link href='/sign-up'>Sign up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <div className='auth-wrapper'>
      <div className='auth-inner'>{children}</div>
    </div>
  </div>
)

export default Layout
