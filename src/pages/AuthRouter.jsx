import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { ChoosingRoomPage } from './ChoosingRoomPage'
import HomePage from './HomePage'
import LeaderboardPage from './LeaderboardPage'
import LoginPage from './LoginPage'
import RecordingPage from './RecordingPage'
import SignUpPage from './SignUpPage'
import WaitingRoomPage from './WaitingRoomPage'

export const AuthRouter = () => {
  //Find authentiacation status
  const isAuthenticated = false

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/recording' component={RecordingPage} />
          <Route path='/sign-in' component={LoginPage} />
          <Route path='/sign-up' component={SignUpPage} />
          <Route path='/leaderboard' component={LeaderboardPage} />
          <Route path='/choosing-room' component={ChoosingRoomPage} />
          <Route path='/waiting-room' component={WaitingRoomPage} />
          <Route path='/recording-page' component={RecordingPage} />
          <Redirect to={'/'} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}
