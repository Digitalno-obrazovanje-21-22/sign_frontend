import StartingPageContent from '../components/StartingPage/StartingPageContent'
import { urls } from '../utils/baseUrls'
import React from 'react'
import { Container } from 'react-bootstrap'
import axiosInstance from '../axiosInstance/axiosInstance'
import { ScreenRecorderApp } from '../components/Recording/RecordingComponent'
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
    }
  }

  fetchUserData = () => {
    axiosInstance.get(urls.userUrl + '/' + localStorage.getItem('userId')).then((response) => {
      this.setState({ user: response.data })
    })
  }

  componentDidMount() {
    this.fetchUserData()
  }

  render() {
    return (
      <Container className='justify-content-md-center' style={{ width: '60em', height: 'auto', background: 'rgb(128, 204, 255, 0.3)', paddingBottom: '2em' }}>
        <StartingPageContent user={this.state.user} />
      </Container>
    )
  }
}

export default HomePage
