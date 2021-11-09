import axios from 'axios';
import StartingPageContent from '../components/StartingPage/StartingPageContent'
import { baseUrl, urls } from '../utils/baseUrls';
import React from 'react';
import {Container} from "react-bootstrap";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        user: { name: "Ivo Ivić", score: 2540}
    };
  }

  fetchUserData = () => {
    axios.get(baseUrl + "/" + urls.userUrl)
      .then(response => {
        console.log(response);
        this.setState({user: response.data})
      })
  }

  componentDidMount() {
    this.fetchUserData();
  }

  render(){
    return(
      <Container className="justify-content-md-center" style={{width:"60em", height:"auto", background:"rgb(128, 204, 255, 0.3)", paddingBottom:"2em"}} >
         <StartingPageContent user={this.state.user} />
      </Container>
       )
  }

}

export default HomePage
