import { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import WaitingParticipantsComponent from '../components/WaitingParticipants/WaitingParticipantsComponent'
import AuthContext from '../store/auth-context'
import io from 'socket.io-client'
import Loader from '../components/LoaderClip/Loader'

export const WaitingRoomPage = () => {
  const [socket, setSocket] = useState(null)
  const { id } = useParams()
  const history = useHistory()
  const authCtx = useContext(AuthContext)

  const leaveRoom = () => {
    socket.emit('leaveRoom', { token: authCtx.token, roomId: id })
    history.push(`/rooms`)
  }

  useEffect(() => {
    if (!!authCtx) {
      const socketConnection = io.connect('http://localhost:3001')

      socketConnection.on('startGame', (msg) => {
        console.log(msg)
        history.push(`/rooms/${id}/play`)
      })

      socketConnection.emit('userJoin', { token: authCtx.token, roomId: id })

      setSocket(socketConnection)
    }
  }, [authCtx])

  const startGame = () => {
    socket.emit('startGame', '')
  }

  return (
    <Container style={{ textAlign: 'center', width: '100%', minHeight: '30em' }}>
      <Row >
        <Col>
          <br />
          <div>
            <div style={{ textAlign: 'center' }}>
              <h4>Waiting for other users to join..</h4>
              <h5>Users currently playing:</h5><br />
            </div>
          </div>

        </Col>
      </Row>
      <Row >
        <Col>
          <WaitingParticipantsComponent />
          <Row>
            <Col>
              <Button size='md' variant='primary' style={{ marginLeft: '1em', width: '8em' }} onClick={() => startGame()}>
                Start game
              </Button>
              <Button size='md' variant='primary' style={{ marginLeft: '1em', width: '8em' }} onClick={() => leaveRoom()}>
                Return
              </Button>
            </Col>
          </Row>
        </Col>
      </Row><br /><br />
      <Loader guessing={true} />
    </Container >
  )
}
