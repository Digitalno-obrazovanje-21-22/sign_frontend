import { useState } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import { Container, Row, Col } from "react-bootstrap";
export const RecordingComponent = () => {
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

  return (
    <div>
      <a href={blobUrl} download='apple'>
        hello there
      </a>
      <ReactMediaRecorder
        video
        onStop={(blobUrl, blob) => {
          setBlobUrl(blobUrl)
        }}
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <Container>
            <Row content="flex">
              <p>{status}</p>
              <video src={mediaBlobUrl || undefined} controls autoPlay loop playsInline muted/>
              <br />
            </Row>
            <Row>
              <Col>
                <div class="float-end">
                  <button onClick={startRecording} className='btn btn-primary btn-block float-right'>
                    Start Recording
                  </button>
                  <button onClick={stopRecording} className='btn btn-secondary btn-block float-right' style={{ marginRight: "2em" }}>
                    Stop Recording
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        )
        }
      />
    </div >
  )
}
