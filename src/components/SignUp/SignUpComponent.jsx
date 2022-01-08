import { useContext, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { urls } from '../../utils/baseUrls'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'
import axiosInstance from '../../axiosInstance/axiosInstance'

const SignUpComponent = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext)

  const firstNameInputRef = useRef()
  const lastNameInputRef = useRef()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const [isLoading, setIsLoading] = useState(false)

  const signUp = () => {
    setIsLoading(true)

    const dataToSubmit = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    }

    axiosInstance
      .post(urls.signUpUrl, dataToSubmit)
      .then((response) => {
        const token = response.data.token
        authCtx.login(token)
        history.replace('/')
      })
      .catch((error) => {
        const errorMessage = error.response.data.message
        alert(errorMessage)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <form className='justify-content-md-center' style={{ width: '25em' }}>
      <h3>Sign Up</h3>

      <div className='form-group'>
        <label>First name</label>
        <input type='text' className='form-control' ref={firstNameInputRef} placeholder='First name' />
      </div>

      <div className='form-group'>
        <label>Last name</label>
        <input type='text' className='form-control' ref={lastNameInputRef} placeholder='Last name' />
      </div>

      <div className='form-group'>
        <label>Email address</label>
        <input type='email' className='form-control' ref={emailInputRef} placeholder='Enter email' />
      </div>

      <div className='form-group'>
        <label>Password</label>
        <input type='password' className='form-control' ref={passwordInputRef} placeholder='Enter password' />
      </div>

      {!isLoading && <Button onClick={() => signUp()}>Sign Up</Button>}
      {isLoading && <p>Loading...</p>}
      <p className='forgot-password text-right'>
        Already registered <a href='/sign-in'>sign in?</a>
      </p>
    </form>
  )
}

export default SignUpComponent
