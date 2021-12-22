
import React from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
import TimerComponent from '../components/Timer/TimerComponent';
import RecordingVideoComponent from '../components/Recording/RecordingVideoComponent';
import GuessingComponent from '../components/GuessingSign/GuessingComponent';
import { urls } from '../utils/baseUrls';
import axiosInstance from '../axiosInstance/axiosInstance'
import GameEndComponent from '../components/GameEnd/GameEndComponent';
class RecordingPage extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      userId: 1,
      recordingStarted: false,
      recordingStopped: false,
      guessingStopped: false,
      roundOverviewStarted: false,
      alertText: "Recording will start in 5 seconds",
      alertVariant: "success",
      timerInit: "00:00:05",
      signs: null,
      correctSign: null
    };
  }

  //TODO: fetch random signs from BE
  fetchRandomSign = () => {
    axiosInstance.get(urls.signsUrl + "/random").then((response) => {
      let signNames = [];

      const randomSigns = response.data;
      randomSigns.forEach(sign => {
        signNames.push(sign.name)
        if (sign.isCorrect) {
          this.setState({
            correctSign: sign.name
          })
        }
      })
      this.setState({
        signs: signNames
      })
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
        alertVariant: "danger",
        timerInit: "00:00:10"
      })
      //console.log("Recording stopped");
    }, 15000)
    setTimeout(() => {
      this.setState({
        guessingStopped: true,
        alertVariant: "info",
        timerInit: "00:00:05"
      })
    }, 25000)
    setTimeout(() => {
      this.setState({
        roundOverviewStarted: true,
        timerInit: "00:00:10"
      })
      console.log("Guessing stopped!")
    }, 30000)
  }

  render() {
    return (
      <Container style={{ width: "100%", paddingTop: "1em", minHeight: "40em", height: "auto", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
        <Row>
          <Alert variant={this.state.alertVariant} style={{ textAlign: "center" }}>
            <TimerComponent timerInit={this.state.timerInit}></TimerComponent>
          </Alert>
        </Row>

        {!this.state.recordingStarted ? <Row style={{ textAlign: "center" }}><h4>{this.state.alertText}</h4><hr /></Row> : null}
        {this.state.recordingStarted && !this.state.recordingStopped ? <RecordingVideoComponent recordingStarted={this.state.recordingStarted} recordingStopped={this.state.recordingStopped} correctSign={this.state.correctSign}></RecordingVideoComponent> : null}
        {this.state.recordingStarted && this.state.recordingStopped && !this.state.roundOverviewStarted ? <GuessingComponent guessingStopped={this.state.guessingStopped} correctSign={this.state.correctSign} signs={this.state.signs}></GuessingComponent> : null}
        {this.state.roundOverviewStarted ? <GameEndComponent></GameEndComponent> : null}
      </Container>
    )
  }

}

export default RecordingPage;
