import React, { Component, useState } from 'react'
import {Button} from "react-bootstrap";
import { baseUrl, urls } from '../../utils/baseUrls';
import axios from 'axios'
export const SignUpComponent = () => {

  let [ firstName, setFirstName ] = useState();
  let [ lastName, setLastName ] = useState();
  let [ email, setEmail ] = useState();
  let [ password, setPassword] = useState();


  const signUp = () => {
    console.log("send data to be")
    axios.post(baseUrl + "/" + urls.userSignUpUrl,{
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })
      .then(response => {
        console.log(response);
      })
  }

  const setFirstNameValue = (value) => {
    console.log(value);
    setFirstName({value});
    console.log(firstName)
}
  const setLastNameValue = async (value) => {
      console.log(value);
      setLastName({value});
      console.log(lastName)
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
    <form>
      <h3>Sign Up</h3>

      <div className='form-group'>
        <label>First name</label>
        <input type='text' className='form-control' placeholder='First name' onChange={event => setFirstNameValue(event.target.value)} />
      </div>

      <div className='form-group'>
        <label>Last name</label>
        <input type='text' className='form-control' placeholder='Last name' onChange={event => setLastNameValue(event.target.value)} />
      </div>

      <div className='form-group'>
        <label>Email address</label>
        <input type='email' className='form-control' placeholder='Enter email' onChange={event => setEmailValue(event.target.value)} />
      </div>

      <div className='form-group'>
        <label>Password</label>
        <input type='password' className='form-control' placeholder='Enter password' onChange={event => setPasswordValue(event.target.value)}/>
      </div>

      <Button type='submit'  href="/home-page" onClick={() => signUp()}>
        Sign Up
      </Button>
      <p className='forgot-password text-right'>
        Already registered <a href='/sign-in'>sign in?</a>
      </p>
    </form>
  )
}

export default SignUpComponent
