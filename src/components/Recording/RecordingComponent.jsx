import { useEffect, useState } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import { Container, Row, Button, Col } from "react-bootstrap";
import VideoPreview from './VideoPreview';
import io from "socket.io-client";
import { v4 as uuid } from 'uuid';

export const RecordingComponent = ({ recordingStarted, recordingStopped }) => {
  const [socket, setSocket] = useState(null)

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
    const socketConnection = io.connect("http://localhost:3001");
    function recievedMessage(msg) {
      console.log("Recieved:");
      console.log(msg)
      //Start counter;
    }
    
    socketConnection.on("msgToClient", (msg) => {
      recievedMessage(msg);
    })
    setSocket(socketConnection)
  }, []);

  if(socket==null) {
    return null;
  }

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
          <Button className="btn btn-block" size="md" onClick={() => sendMessage()} style={{ width: "10em", marginBottom: "1em", backgroundColor:"#0099cc",  border:"#007399"  }}>Send message</Button><br />
          <Button className="btn btn-block" href={mediaBlobUrl} download='video_record' style={{ width:"10em", marginBottom: "1em", backgroundColor:"#0099cc", border:"#007399" }}>
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
