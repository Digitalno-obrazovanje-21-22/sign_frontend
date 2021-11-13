import { RecordingComponent } from '../components/Recording/RecordingComponent'
import React from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
import Countdown from 'react-countdown';
class RecordingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      recordingStarted: false,
      recordingStopped: false,
      alertText: "Recording will start in 3 seconds..",
      alertVariant: "success",
      timer: Date.now() + 3000
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        recordingStarted: true,
        alertText: "Recording started...",
        alertVariant: "danger",
        timer: Date.now() + 5000
      })
      //console.log("Recording started...");
    }, 3000)
    setTimeout(() => {
      this.setState({
        recordingStopped: true,
        alertText: "Recording stopped.",
        alertVariant: "success",
        timer: 0
      })
      //console.log("Recording stopped");
    }, 10000)
  }

  render() {
    return (
      <Container style={{ width: "100%", paddingTop: "1em", height: "40em", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
        <Row>
          <Alert variant={this.state.alertVariant} style={{ textAlign: "center" }}>
            {this.state.alertText}
            <Countdown date={this.state.timer} />,
          </Alert>
        </Row>
        <Row>
          <Col><RecordingComponent recordingStarted={this.state.recordingStarted} recordingStopped={this.state.recordingStopped}></RecordingComponent></Col>
        </Row>
      </Container>
    )
  }

}

export default RecordingPage;
