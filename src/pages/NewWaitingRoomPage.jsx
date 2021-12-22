import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap"
import { useHistory, useParams } from "react-router"
import WaitingParticipantsComponent from "../components/WaitingParticipants/WaitingParticipantsComponent"
import AuthContext from "../store/auth-context"
import io from "socket.io-client";
import { isClassStaticBlockDeclaration } from "typescript"

export const NewWaitingRoomPage = () => {
  const [socket, setSocket] = useState(null)
  const { id } = useParams()
  const history = useHistory()
  const authCtx = useContext(AuthContext)

  const leaveRoom = () => {
    socket.emit("leaveRoom", authCtx.token)
    history.push(`/rooms`)
  }

  useEffect(() => {
    if(!!authCtx) {
      const socketConnection = io.connect("http://localhost:3001");
      
      socketConnection.on("startGame", (msg) => {
        console.log(msg)
        history.push(`/rooms/${id}/play`)
      })

      socketConnection.emit('userJoin', {token: authCtx.token, roomId: id})

      setSocket(socketConnection)
    }
  }, [authCtx])

  const startGame = () => {
    socket.emit("startGame", "")
  }

  return (
    <Container style={{ width: "60em", height: "auto", minHeight: "30em", background: "rgb(128, 204, 255, 0.3)" }}>
        <Row>
            <Col>
                <h4>Waiting for other users to join..</h4>
                <h5>Currently here:</h5>
            </Col>
        </Row>
        <Row>
            <Col md={7}>
                <Row style={{ textAlign: "center", marginLeft: "8em" }}>
                  <WaitingParticipantsComponent/>
                </Row>
            </Col>
            <Col>
            <Button size="md" style={{ float: "right", backgroundColor:"#0099cc", marginLeft:"1em", width:"8em"}} onClick={() => startGame()}>Start game</Button>
            <Button size="md" style={{float:"right", backgroundColor:"#0099cc", width:"8em"}} onClick={() => leaveRoom()}>Return</Button>
            </Col>
        </Row>
    </Container>
  )
}