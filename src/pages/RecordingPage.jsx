import { RecordingComponent } from '../components/Recording/RecordingComponent'
import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
class RecordingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
    };
  }

  render() {
    return (
      <Container style={{ width: "55em", paddingTop: "1em", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
        <Row>
          <Col>
            <RecordingComponent></RecordingComponent>
          </Col>
        </Row>
      </Container>

    )
  }


}

export default RecordingPage;
