import { useContext } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import AuthContext from '../store/auth-context'
import { ChoosingRoomPage } from './ChoosingRoomPage'
import HomePage from './HomePage'
import LeaderboardPage from './LeaderboardPage'
import LoginPage from './LoginPage'
import { RecordingPage } from './RecordingPage'
import SignUpPage from './SignUpPage'
import WaitingRoomPage from './WaitingRoomPage'
import StartGamePage from './StartGamePage'
import { RoomsPage } from './RoomsPage'
import { NewWaitingRoomPage } from './NewWaitingRoomPage'
import { PlayPage } from './PlayPage'

export const AuthRouter = () => {
  //Find authentiacation status
  const authCtx = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/' exact component={HomePage} />

          {!authCtx.isLoggedIn && <Route path='/sign-in' component={LoginPage} />}
          {!authCtx.isLoggedIn && <Route path='/sign-up' component={SignUpPage} />}

          {authCtx.isLoggedIn && <Route path='/recording' component={RecordingPage} />}
          {authCtx.isLoggedIn && <Route path='/waiting-start-game' component={StartGamePage} />}
          {authCtx.isLoggedIn && <Route path='/leaderboard' component={LeaderboardPage} />}
          {authCtx.isLoggedIn && <Route path='/choosing-room' component={ChoosingRoomPage} />}
          {authCtx.isLoggedIn && <Route path='/waiting-room' component={WaitingRoomPage} />}
          {authCtx.isLoggedIn && <Route path='/recording-page' component={RecordingPage} />}

          {authCtx.isLoggedIn && <>
            <Route exact path='/rooms' component={RoomsPage}/>
            <Route exact path='/rooms/:id' component={NewWaitingRoomPage}/>
            <Route exact path='/rooms/:id/play' component={PlayPage}/>
          </>}

          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}
