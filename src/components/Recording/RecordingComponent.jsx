import { useContext, useEffect } from 'react'
import { Container, Row, Button, Col } from 'react-bootstrap'
import VideoPreview from './VideoPreview'
import AuthContext from '../../store/auth-context'
import useMediaRecorder from '@wmik/use-media-recorder'

export const Player = ({ srcBlob }) => {
  if (!srcBlob) {
    return null
  }

  return (
    <div>
      <h5>Prewiew of recorded video. Send video to others?</h5>
      <video src={URL.createObjectURL(srcBlob)} width={520} height={480} autoPlay playsInline loop muted />
    </div>
  )
}

export const RecordingComponent = ({ recording, recordAgain, socket, sign }) => {
  const authCtx = useContext(AuthContext)

  let { status, mediaBlob, stopRecording, startRecording, liveStream, clearMediaBlob } = useMediaRecorder({
    recordScreen: false,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio: true, video: true },
  })

  useEffect(() => {
    if (recording && status != 'recording') {
      startRecording()
      console.log('recording started')
    }
    if (!recording && status != 'stopped') {
      console.log('stopped recording')
      stopRecording()
    }
  }, [recording])

  useEffect(() => {
    console.log(mediaBlob)
  }, [mediaBlob])

  if (socket == null) {
    return null
  }

  function sendMessage(videoBase64) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(mediaBlob)
    fileReader.onload = () => {
      socket.emit('startGuessing', { token: authCtx.token, guess: fileReader.result, sign })
    }
  }
  const trigerRecordAgain = () => {
    clearMediaBlob()
    recordAgain()
  }
  return (
    <Container className='card loginComponent'>
      <Row>
        {!recording && <Player srcBlob={mediaBlob} />}
        {recording && <VideoPreview stream={liveStream} />}
      </Row>

      <Row>
        <Button
          disabled={recording}
          className='btn btn-block'
          size='md'
          variant='primary'
          onClick={() => sendMessage()}
          style={{ width: '10em', margin: 'auto' }}
        >
          Send video
        </Button>
        <br />
        <Button
          disabled={recording}
          className='btn btn-block'
          variant='primary'
          href={!!mediaBlob ? URL.createObjectURL(mediaBlob) : ''}
          download='video_record'
          style={{ width: '10em', margin: 'auto' }}
        >
          Download video
        </Button>
        <br />
        <Button onClick={() => trigerRecordAgain()} disabled={recording} className='btn btn-block' variant='primary' style={{ width: '10em', margin: 'auto' }}>
          {/* //TODO: ovdje je potrebno ponoviti snimanje videa */}
          Record video again?
        </Button>
      </Row>
    </Container>
  )
}
