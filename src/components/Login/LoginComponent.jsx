import React, { useContext, useRef, useState } from 'react'
import { urls } from '../../utils/baseUrls'
import { Button } from 'react-bootstrap'
import AuthContext from '../../store/auth-context'
import { useHistory } from 'react-router-dom'
import axiosInstance from '../../axiosInstance/axiosInstance'

const LoginComponent = () => {
  const history = useHistory()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [isLoading, setIsLoading] = useState(false)

  const authCtx = useContext(AuthContext)

  const signIn = () => {
    setIsLoading(true)

    const dataToSubmit = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    }

    axiosInstance
      .post(urls.signInUrl, dataToSubmit)
      .then((response) => {
        if (response) {
          const token = response.data.token
          authCtx.login(token)
          history.replace('/')
        }
      })
      .catch((error) => {
        console.error(error)
        const errorMessage = error.response.data.message
        alert(errorMessage)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form className='justify-content-md-center' style={{ width: '25em' }}>
      <h3>Sign In</h3>

      <div className='form-group'>
        <label>Email address</label>
        <input type='email' ref={emailInputRef} className='form-control' placeholder='Enter email' />
      </div>

      <div className='form-group'>
        <label>Password</label>
        <input type='password' ref={passwordInputRef} className='form-control' placeholder='Enter password' />
      </div>

      <div className='form-group'>
        <div className='custom-control custom-checkbox'>
          <input type='checkbox' className='custom-control-input' id='customCheck1' />
          <label className='custom-control-label' htmlFor='customCheck1'>
            Remember me
          </label>
        </div>
      </div>

      {!isLoading && <Button onClick={() => signIn()}>Submit</Button>}
      {isLoading && <p>Loading...</p>}

      <p className='forgot-password text-right'>
        Forgot <a href='/'>password?</a>
      </p>
    </form>
  )
}
export default LoginComponent
