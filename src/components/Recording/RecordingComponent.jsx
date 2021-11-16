import { useEffect } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import { Container, Row, Button, Col } from "react-bootstrap";
import VideoPreview from './VideoPreview';
import io from "socket.io-client";
import { v4 as uuid } from 'uuid';

export const RecordingComponent = ({ recordingStarted, recordingStopped }) => {

  const socket = io.connect("http://localhost:3001");

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream
  } = useReactMediaRecorder({ video: true });

  useEffect(() => {
    if (recordingStarted) {
      startRecording()
    }
    if (recordingStopped) {
      stopRecording();
      sendMessage();
    }
  }, [recordingStopped, recordingStarted])


  useEffect(() => {
    function recievedMessage(msg) {
      console.log("Recieved:");
      console.log(msg)
      //Start counter;
    }

    socket.on("msgToClient", (msg) => {
      recievedMessage(msg);
    })
  }, []);

  function sendMessage() {
    const newMessage = {
      id: uuid(),
      text: "Start guessing!"
    }
    socket.emit("msgToServer", newMessage)
  }

  return (
    <Container>
      <Row >
        <Col md="2"  className = "btn-block">
          <Button className="btn btn-block" size="md" onClick={() => sendMessage()} style={{ width: "10em", marginBottom: "1em", backgroundColor:"#0099cc",  border:"#007399"  }}>Send message</Button><br />
          <Button block={true}  className="btn btn-block" block href={mediaBlobUrl} download='video_record' style={{ width:"10em", marginBottom: "1em", backgroundColor:"#0099cc", border:"#007399" }}>
            Download
          </Button>
        </Col>
        <Col>
          <ReactMediaRecorder
            className="justify-content-md-center"
            video
            render={() => (
              <Container>
                <Row>
                  <VideoPreview stream={previewStream} />
                </Row>
              </Container>
            )}
          />
        </Col>
        <Col md="2"></Col>
      </Row>


    </Container>
  )
}
