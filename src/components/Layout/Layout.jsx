import React, { ReactChildren, ReactChild } from 'react'
import { Container, Nav, Navbar, Button, Image } from 'react-bootstrap'
const logo = require('../../assets/signsLogo.png')

interface LayoutProps {
  children: ReactChild | ReactChildren
}

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>
          <img src={logo} width='30' height='30' className='d-inline-block align-top' />
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link href='/recording'>Recording</Nav.Link>
          <Nav.Link href='/sign-in'>Log in</Nav.Link>
          <Nav.Link href='/sign-up'>Sign up</Nav.Link>
          <Nav.Link href='/leaderboard'>Leaderboard</Nav.Link>
          <Nav.Link href='/choosing-room'>Join room</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <div className='auth-wrapper'>
      <div className='auth-inner'>{children}</div>
    </div>
  </div>
)

export default Layout
