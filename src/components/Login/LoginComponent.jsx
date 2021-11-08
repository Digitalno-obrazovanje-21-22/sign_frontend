import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl, urls } from '../../utils/baseUrls'
import {Button} from "react-bootstrap";
import { couldStartTrivia } from 'typescript';

const LoginComponent = ({userId}) => {

  const [ email, setEmail ] = useState();
  const [ password, setPassword] = useState();

  const signIn = () => {
    console.log("send data to be")
    axios.post(baseUrl + "/" + urls.userSignInUrl, {
      email: email,
      password: password
    })
      .then(response => {
        console.log(response);
      })
  }

  const setEmailValue = (value) => {
      console.log(value);
      setEmail({value});
      console.log(email)
  }
  const setPasswordValue = async (value) => {
      console.log(value);
      setPassword({value});
      console.log(password)
  }
  return (
    <form className="justify-content-md-center" style={{width:"25em"}}>
      <h3>Sign In</h3>

      <div className='form-group'>
        <label>Email address</label>
        <input type='email' className='form-control' placeholder='Enter email' onChange={(event) => setEmailValue(event.target.value)} />
      </div>

      <div className='form-group'>
        <label>Password</label>
        <input type='password' className='form-control' placeholder='Enter password' onChange={(event) => setPasswordValue(event.target.value)}/>
      </div>

      <div className='form-group'>
        <div className='custom-control custom-checkbox'>
          <input type='checkbox' className='custom-control-input' id='customCheck1' />
          <label className='custom-control-label' htmlFor='customCheck1'>
            Remember me
          </label>
        </div>
      </div>

      <Button type='submit' href="/home-page" onClick={() => signIn()}>
        Submit
      </Button>
      <p className='forgot-password text-right'>
        Forgot <a href='#'>password?</a>
      </p>
    </form>
  )
}
export default LoginComponent
