import { useEffect, useState } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import { Container, Row, Col } from "react-bootstrap";
import VideoPreview from './VideoPreviw';
export const RecordingComponent = ({ recordingStarted, recordingStopped }) => {
  /*const videoRef = useRef<HTMLVideoElement>(null);
    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({ video: true });

    useEffect(() => {
        console.log(videoRef.current)
    }, [mediaBlobUrl])*/
  const [blobUrl, setBlobUrl] = useState(null)
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream
  } = useReactMediaRecorder({ video: true });

  useEffect(() => {
    if (recordingStarted) {
      startRecording();
    }
  }, [recordingStarted])

  useEffect(() => {
    if (recordingStopped) {
      stopRecording();
    }
  }, [recordingStopped])



  return (
    <Container>
      <a href={blobUrl} download='apple'>
      </a>
      <ReactMediaRecorder
        video
        onStop={(blobUrl, blob) => {
          setBlobUrl(blobUrl)
        }}
        render={({ }) => (
          <Container>
            <Row content="flex">
              <VideoPreview stream={previewStream} />
              <br />
            </Row>
          </Container>
        )
        }
      />
    </Container >
  )
}
