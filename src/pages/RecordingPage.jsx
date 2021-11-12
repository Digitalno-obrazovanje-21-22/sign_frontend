import { RecordingComponent } from '../components/Recording/RecordingComponent'
import React from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
class RecordingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      recordingStarted: false,
      recordingStopped: false,
      alertText: "Recording will start in 5 seconds..",
      alertVariant: "success"
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        recordingStarted: true,
        alertText: "Recording started...",
        alertVariant: "danger"
      })
      console.log("Recording started...");
    }, 3000)
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.setState({
        recordingStopped: true,
        alertText: "Recording stopped.",
        alertVariant: "success"
      })
      console.log("Recording stopped");
    }, 5000)
  }

  render() {
    return (
      <Container style={{ width: "70em", paddingTop: "1em", height: "40em", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
        <Row>
          <Alert variant={this.state.alertVariant} style={{textAlign:"center"}}>
          {this.state.alertText}
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
