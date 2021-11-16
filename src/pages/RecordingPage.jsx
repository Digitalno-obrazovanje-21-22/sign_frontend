import { RecordingComponent } from '../components/Recording/RecordingComponent'
import React from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
import TimerComponent from '../components/Timer/TimerComponent';
class RecordingPage extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      userId: 1,
      recordingStarted: false,
      recordingStopped: false,
      alertText: "Recording will start in..",
      alertVariant: "success",
      timerInit: "00:00:05"
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        recordingStarted: true,
        alertText: "Recording started...",
        alertVariant: "danger",
        timerInit: "00:00:05 "
      })
      //console.log("Recording started...");
    }, 5000)
    setTimeout(() => {
      this.setState({
        recordingStopped: true,
        alertText: "Start guessing",
        alertVariant: "success",
        timerInit: "00:00:05"
      })
      //console.log("Recording stopped");
    }, 10000)
  }

  //TODO: fetch random sign name from BE

  render() {
    return (
      <Container style={{ width: "100%", paddingTop: "1em", minHeight: "40em", height: "auto", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
        <Row>
          <Alert variant={this.state.alertVariant} style={{ textAlign: "center" }}>
            {this.state.alertText}
            <TimerComponent timerInit={this.state.timerInit}></TimerComponent>
          </Alert>
        </Row>
        {this.state.recordingStarted ? 
        <Container>
          <Row style={{textAlign:"center"}}><h4>Sign: Good afternoon!</h4></Row>
          <Row>
            <Col><RecordingComponent recordingStarted={this.state.recordingStarted} recordingStopped={this.state.recordingStopped}></RecordingComponent></Col>
          </Row>
        </Container> : null}
      </Container>
    )
  }

}

export default RecordingPage;
