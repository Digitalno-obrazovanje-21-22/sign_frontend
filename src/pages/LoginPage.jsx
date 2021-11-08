import LoginComponent from '../components/Login/LoginComponent'
import React from "react";
import {Container} from "react-bootstrap";
class LoginPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render(){
    return (
      <Container style={{ width:"40em", height:"auto", paddingTop:"1em", paddingLeft:"5em", paddingRight:"5em", paddingBottom:"2em", background:"rgb(128, 204, 255, 0.3)"}}  className="justify-content-md-center" >
          <LoginComponent  />
      </Container>
)
  }
}

export default LoginPage
