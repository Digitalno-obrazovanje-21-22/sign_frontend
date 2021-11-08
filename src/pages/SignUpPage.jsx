import SignUpComponent from '../components/SignUp/SignUpComponent'
import React from 'react';
import {Container} from "react-bootstrap";
class SignUpPage extends React.Component {

  render(){
    return (
      <Container style={{ width:"40em", height:"auto", paddingTop:"1em", paddingLeft:"5em", paddingRight:"5em", paddingBottom:"2em", background:"rgb(128, 204, 255, 0.3)"}}  className="justify-content-md-center" >
        <SignUpComponent />
      </Container>
    )
  }
}

export default SignUpPage
