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
      stopRecording()
    }
  }, [recordingStopped, recordingStarted])


  useEffect(() => {
    function recievedMessage(msg) {
      console.log("Recieved:");
      console.log(msg)
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
        <Col md="2">
          <Button size="md" variant="info" onClick={() => sendMessage()} style={{ marginBottom: "1em" }}>Send message</Button><br />
          <Button size="md" variant="info" href={mediaBlobUrl} download='video_record'>
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
