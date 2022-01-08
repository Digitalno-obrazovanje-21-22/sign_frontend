import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import logo from '../../assets/logo2.png'
import AuthContext from '../../store/auth-context'

const Layout = ({ children }) => {
  const authCtx = useContext(AuthContext)
  const logoutHandler = () => authCtx.logout()
  const isLoggedIn = authCtx.isLoggedIn
  // const isInRoom = roomCtx.apartOfTheGame
  const user = {
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
  }

  return (
    <div>
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <img src={logo} width='auto' height='30' className='d-inline-block align-top' alt='' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='/'>Home</Nav.Link>
              {isLoggedIn && (
                <>
                  <Nav.Link href='/leaderboard'>Leaderboard</Nav.Link>
                  <Nav.Link href='/rooms'>Join room</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              {isLoggedIn && (
                <Nav.Link style={{ paddingRight: '2em', color: '' }}>
                  {user.firstName.toLocaleUpperCase()} {user.lastName.toLocaleUpperCase()}
                </Nav.Link>
              )}
              {!isLoggedIn && (
                <>
                  <Nav.Link href='/sign-in'>Log in</Nav.Link>
                  <Nav.Link href='/sign-up'>Sign up</Nav.Link>
                </>
              )}
              {isLoggedIn && <Nav.Link onClick={() => logoutHandler()}>Log out</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>{children}</div>
    </div>
  )
}

export default Layout
