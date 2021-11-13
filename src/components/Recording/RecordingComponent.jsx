import { useEffect } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import { Container, Row } from "react-bootstrap";
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
    socket.on("msgToClient", (msg) => {
      recievedMessage(msg);
    })
  }, [recordingStopped, recordingStarted])

  function recievedMessage(msg) {
    console.log("Recieved: " + msg.text)
  }

  function sendMessage() {
    const newMessage = {
      id: uuid,
      text: "Start guessing!"
    }
    socket.emit("msgToServer", newMessage)
  }

  return (
    <Container>
      <button onClick={() => sendMessage()}>Send message</button>
      <a href={mediaBlobUrl} download='video_record'>
        Download
      </a>
      <ReactMediaRecorder
        video
        render={() => (
          <Container>
            <Row>
              <VideoPreview stream={previewStream} />
            </Row>
          </Container>
        )}
      />
    </Container>
  )
}
