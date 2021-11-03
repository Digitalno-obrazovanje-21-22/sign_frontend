import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import RecordingPage from './RecordingPage'

import SignUpPage from './SignUpPage'

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
          <Redirect to={'/'} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}
