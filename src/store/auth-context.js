import jwtDecode from 'jwt-decode'
import React, { useState, useCallback } from 'react'

let logoutTimer

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
})

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  const remainingDuration = adjExpirationTime - currentTime

  return remainingDuration
}

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token')
  const storedExpirationDate = localStorage.getItem('expirationTime')
  const userId = localStorage.getItem('userId')

  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 60000) {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')
    return null
  }

  return {
    token: storedToken,
    duration: remainingTime,
    userId: userId,
  }
}

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken()

  let initialToken
  if (tokenData) {
    initialToken = tokenData.token
  }

  const [token, setToken] = useState(initialToken)

  const userIsLoggedIn = !!token

  const logoutHandler = useCallback(() => {
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('userId')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token) => {
    const data = jwtDecode(token)
    const expirationTime = new Date(data.exp * 1000)

    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)
    localStorage.setItem('userId', data.id)
    setToken(token)

    // const remainingTime = calculateRemainingTime(expirationTime)
    // logoutTimer = setTimeout(logoutHandler, remainingTime);
  }

  // useEffect(() => {
  //   if (tokenData) {
  //     console.log(tokenData.duration);
  //     logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  //   }
  // }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext
