import React, { ReactChildren, ReactChild } from 'react'
import { Container, Nav, Navbar, Button, Image } from 'react-bootstrap'
import logo from '../../assets/logo2.png';

const Layout = ({ children }) => (
  <div>
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
          <img src={logo} width='auto' height='30' className='d-inline-block align-top' />
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/leaderboard'>Leaderboard</Nav.Link>
          <Nav.Link href='/choosing-room'>Join room</Nav.Link>
          <Nav.Link href='/sign-in' style={{paddingLeft:"45em"}}>Log in</Nav.Link>
          <Nav.Link href='/sign-up'>Sign up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <div >
      <div>{children}</div>
    </div>
  </div>
)

export default Layout
