import axios from 'axios';
import StartingPageContent from '../components/StartingPage/StartingPageContent'
import { baseUrl, urls } from '../utils/baseUrls';
import React from 'react';
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
    return(<StartingPageContent user={this.state.user} />)
  }

}

export default HomePage
