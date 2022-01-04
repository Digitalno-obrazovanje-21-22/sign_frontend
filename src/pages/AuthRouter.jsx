import { useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import AuthContext from '../store/auth-context'
import HomePage from './HomePage'
import LeaderboardPage from './LeaderboardPage'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import { RoomsPage } from './RoomsPage'
import { WaitingRoomPage } from './WaitingRoomPage'
import { PlayPage } from './PlayPage'

export const AuthRouter = () => {
  const authCtx = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={HomePage} />

          {!authCtx.isLoggedIn && 
            <>
              <Route path='/sign-in' component={LoginPage} />
              <Route path='/sign-up' component={SignUpPage} />
            </>
          }

          {authCtx.isLoggedIn && 
            <>
              <Route exact path='/rooms' component={RoomsPage}/>
              <Route exact path='/rooms/:id' component={WaitingRoomPage}/>
              <Route exact path='/rooms/:id/play' component={PlayPage}/>
              <Route path='/leaderboard' component={LeaderboardPage} />
            </>
          }

          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}
