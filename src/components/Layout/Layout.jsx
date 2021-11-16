import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../../assets/logo2.png'
import AuthContext from '../../store/auth-context'
import RoomContext from '../../store/room-context'

const Layout = ({ children }) => {
  const authCtx = useContext(AuthContext)
  const roomCtx = useContext(RoomContext)
  const logoutHandler = () => authCtx.logout()
  const isLoggedIn = authCtx.isLoggedIn
  const isInRoom = !roomCtx.apartOfTheGame
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} width='auto' height='30' className='d-inline-block align-top' alt='' />
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            {isLoggedIn && isInRoom && (
              <>
                <Nav.Link href='/leaderboard'>Leaderboard</Nav.Link>
                <Nav.Link href='/choosing-room'>Join room</Nav.Link>

                <Nav.Link onClick={() => logoutHandler()} style={{ paddingLeft: '45em' }}>
                  Log out
                </Nav.Link>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Link href='/sign-in' style={{ paddingLeft: '45em' }}>
                  Log in
                </Nav.Link>
                <Nav.Link href='/sign-up'>Sign up</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Layout
