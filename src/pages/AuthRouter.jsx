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
import { ProfilePage } from './ProfilePage'
import AboutPage from './AboutPage'

export const AuthRouter = () => {
  const authCtx = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route exact pasth="/about" component={AboutPage}></Route>
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
              <Route path='/profile' component={ProfilePage} />
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
