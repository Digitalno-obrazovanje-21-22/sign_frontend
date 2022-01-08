import StartingPageContent from '../components/StartingPage/StartingPageContent'
import { urls } from '../utils/baseUrls'
import React from 'react'
import { Container } from 'react-bootstrap'
import axiosInstance from '../axiosInstance/axiosInstance'
import { ScreenRecorderApp } from '../components/Recording/RecordingComponent'
class HomePage extends React.Component {
  render() {
    return <StartingPageContent />
  }
}

export default HomePage
