import { useContext, useEffect } from 'react'
import { Container, Row, Button, Col } from "react-bootstrap";
import VideoPreview from './VideoPreview';
import AuthContext from '../../store/auth-context';
import useMediaRecorder from '@wmik/use-media-recorder';

export const Player = ({ srcBlob }) => {
  if (!srcBlob) {
    return null;
  }

  return (
    <video
      src={URL.createObjectURL(srcBlob)}
      width={520}
      height={480}
      autoPlay
      playsInline
      loop
      muted
    />
  );
}

export const RecordingComponent = ({ recording, socket, sign }) => {
  const authCtx = useContext(AuthContext)

  let {
    status,
    mediaBlob,
    stopRecording,
    startRecording,
    liveStream
  } = useMediaRecorder({
    recordScreen: false,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio: true, video: true }
  });

  useEffect(() => {
    if (recording && status!='recording' ) {
      startRecording()
    }
    if (!recording && status!='stopped') {
      console.log("stopped recording")
      stopRecording();
    }
  }, [recording])

  useEffect(() => {
    console.log(mediaBlob)
  }, [mediaBlob])

  if(socket==null) {
    return null;
  }

  function sendMessage(videoBase64) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(mediaBlob)
    fileReader.onload = () => {
      socket.emit("startGuessing", {token: authCtx.token, guess: fileReader.result, sign})
    }
  }

  return (
    <Container>
      <Row >
        <Col md="2">
          <Button disabled={recording} className="btn btn-block" size="md" onClick={() => sendMessage()} style={{ width: "10em", marginBottom: "1em", backgroundColor:"#0099cc",  border:"#007399"  }}>Send message</Button><br />
          <Button disabled={recording} className="btn btn-block" href={!!mediaBlob ? URL.createObjectURL(mediaBlob) : ''} download='video_record' style={{ width:"10em", marginBottom: "1em", backgroundColor:"#0099cc", border:"#007399" }}>
            Download
          </Button>
        </Col>
        <Col>
        {!recording && <Player srcBlob={mediaBlob} />}
        {recording && <VideoPreview stream={liveStream}/>}
          
        </Col>
        <Col md="2"></Col>
      </Row>

    </Container>
  )
}
