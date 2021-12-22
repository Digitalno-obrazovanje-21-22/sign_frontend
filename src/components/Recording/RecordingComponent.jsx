import { useContext, useEffect } from 'react'
import { ReactMediaRecorder, useReactMediaRecorder } from 'react-media-recorder'
import { Container, Row, Button, Col } from "react-bootstrap";
import VideoPreview from './VideoPreview';
import AuthContext from '../../store/auth-context';

export const RecordingComponent = ({ recording, socket, sign }) => {
  const authCtx = useContext(AuthContext)

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
    status
  } = useReactMediaRecorder({ video: true });

  useEffect(() => {
    if (recording && status!='recording' ) {
      startRecording()
    }
    if (!recording && status!='stopped') {
      console.log("stopped recording")
      stopRecording();
    }
    // if(recordingStopped && !!mediaBlobUrl) {
    //   const func = async () => {
    //     console.log(mediaBlobUrl)
    //     const blob = await fetch(mediaBlobUrl).then(r => r.blob)
    //     console.log(blob)
    //     const base64Encoded = await blobToBase64(blob)
    //     console.log(base64Encoded)
    //     sendMessage(base64Encoded);
    //   }
    //   func()
    // }
  }, [recording, mediaBlobUrl])

  if(socket==null) {
    return null;
  }

  function sendMessage(videoBase64) {
    socket.emit("startGuessing", {token: authCtx.token, guess: mediaBlobUrl, sign})
  }

  const blobToBase64 = (blob) => new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    })

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
        {recording && 
          <ReactMediaRecorder
            className="justify-content-md-center"
            video
            onStop={(blobUrl, blob) => {
              console.log("inside on stopped")
              console.log(blob)
            }}
            render={() => (
              <Container>
                <Row>
                  <VideoPreview stream={previewStream} />
                </Row>
              </Container>
            )}
          />
        }
        {!recording && <video src={mediaBlobUrl} width={500} height={500} autoPlay playsInline loop muted/>}
          
        </Col>
        <Col md="2"></Col>
      </Row>

    </Container>
  )
}
