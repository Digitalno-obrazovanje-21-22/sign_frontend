
import React from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
import TimerComponent from '../components/Timer/TimerComponent';
import RecordingVideoComponent from '../components/Recording/RecordingVideoComponent';
import GuessingComponent from '../components/GuessingSign/GuessingComponent';
import {urls} from '../utils/baseUrls';
import axiosInstance from '../axiosInstance/axiosInstance'
class RecordingPage extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      userId: 1,
      recordingStarted: false,
      recordingStopped: false,
      alertText: "Recording will start in 5 seconds",
      alertVariant: "success",
      timerInit: "00:00:05",
      sign:null
    };
  }

  //TODO: fetch random sign name from BE
  fetchRandomSign = () => {
    axiosInstance.get(urls.signsUrl + "/random").then((response) => {
      this.setState({ sign: response.data.name })
    })
  }

  componentDidMount() {
    this.fetchRandomSign();

    setTimeout(() => {
      this.setState({
        recordingStarted: true,
        alertText: "Recording started...",
        alertVariant: "danger",
        timerInit: "00:00:10 "
      })
      //console.log("Recording started...");
    }, 5000)
    setTimeout(() => {
      this.setState({
        recordingStopped: true,
        alertText: "Start guessing",
        alertVariant: "success",
        timerInit: "00:00:10"
      })
      //console.log("Recording stopped");
    }, 15000)
  }

  render() {
    return (
      <Container style={{ width: "100%", paddingTop: "1em", minHeight: "40em", height: "auto", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
        <Row>
          <Alert variant={this.state.alertVariant} style={{ textAlign: "center" }}>
            <TimerComponent timerInit={this.state.timerInit}></TimerComponent>
          </Alert>
        </Row>
        
        {!this.state.recordingStarted ? <Row style={{ textAlign: "center" }}><h4>{this.state.alertText}</h4><hr/></Row> : null}
        {this.state.recordingStarted && !this.state.recordingStopped ? <RecordingVideoComponent recordingStarted={this.state.recordingStarted} recordingStopped={this.state.recordingStopped} sign={this.state.sign}></RecordingVideoComponent>: null}
        {this.state.recordingStarted && this.state.recordingStopped ? <GuessingComponent></GuessingComponent>: null}
      </Container>
    )
  }

}

export default RecordingPage;
