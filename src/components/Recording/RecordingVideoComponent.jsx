import { Container, Row, Col } from "react-bootstrap";
import { RecordingComponent } from './RecordingComponent';

const RecordingVideoComponent = ({recordingStarted, recordingStopped }) => {

    return (
        <Container>
            <Row style={{ textAlign: "center" }}><h4>Sign: Good afternoon!</h4><hr/></Row>
            <Row>
                <Col><RecordingComponent recordingStarted={recordingStarted} recordingStopped={recordingStopped}></RecordingComponent></Col>
            </Row>
        </Container>
    )
}

export default RecordingVideoComponent;