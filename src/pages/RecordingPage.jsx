
import React, { useEffect, useState } from 'react';
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
  // fetchRandomSign = () => {
  //   axiosInstance.get(urls.signsUrl + "/random").then((response) => {
  //     let signNames = [];

  //     const randomSigns = response.data;
  //     randomSigns.forEach(sign => {
  //       signNames.push(sign.name)
  //       if (sign.isCorrect) {
  //         this.setState({
  //           correctSign: sign.name
  //         })
  //       }
  //     })
  //     this.setState({
  //       signs: signNames
  //     })
  //   })
  //   setSocket(socketConnection)
  // }, []);

  return (
    // <Container style={{ width: "100%", paddingTop: "1em", minHeight: "40em", height: "auto", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
    //   {recordingState.start && <Row>
    //     <Alert variant={recordingState.alertVariant} style={{ textAlign: "center" }}>
    //       <TimerComponent timerInit={recordingState.timerInit}></TimerComponent>
    //     </Alert>
    //   </Row>}
      
    //   <RecordingVideoComponent socket={socket} recordingStarted={recordingState.start} recordingStopped={recordingState.stop} sign={sign}/>
    //   {/* {!this.state.recordingStarted ? <Row style={{ textAlign: "center" }}><h4>{this.state.alertText}</h4><hr/></Row> : null}
    //   {this.state.recordingStarted && !this.state.recordingStopped ? <RecordingVideoComponent recordingStarted={this.state.recordingStarted} recordingStopped={this.state.recordingStopped} sign={this.state.sign}></RecordingVideoComponent>: null}
    //   {this.state.recordingStarted && this.state.recordingStopped ? <GuessingComponent></GuessingComponent>: null} */}
    // </Container>
  )
}

export default RecordingPage;
