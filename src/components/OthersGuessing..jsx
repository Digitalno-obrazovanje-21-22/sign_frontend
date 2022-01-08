import { useEffect, useState } from 'react'
import { Alert, Container, Row } from 'react-bootstrap'
import TimerComponent from './Timer/TimerComponent'
import { css } from '@emotion/react'
import ClipLoader from 'react-spinners/ClipLoader'
import Loader from './LoaderClip/Loader'

export const OthersGuessing = ({ socket, roomId, token }) => {
  const [guessing, setGuessing] = useState(true)

  useEffect(() => {
    if (!guessing) {
      socket.emit('changePlayer', { token, roomId })
    }
  }, [guessing])

  return (
    <Container>
      <Row style={{ textAlign: 'center', padding: "10px" , marginTop: "10%"}}>
        <h4>Others are guessing!</h4>
      </Row>
      <Row>
        <Alert variant={'Recording'} style={{ textAlign: 'center' }}>
          <TimerComponent timerInit={'00:00:15'} setRecording={setGuessing} />
        </Alert>
        <Loader guessing={guessing} />
      </Row>
    </Container>
  )
}
