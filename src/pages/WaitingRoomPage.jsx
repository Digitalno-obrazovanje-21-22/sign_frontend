import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useHistory, useParams } from "react-router"
import WaitingParticipantsComponent from "../components/WaitingParticipants/WaitingParticipantsComponent"
import AuthContext from "../store/auth-context"
import io from "socket.io-client";

export const WaitingRoomPage = () => {
  const [socket, setSocket] = useState(null)
  const { id } = useParams()
  const history = useHistory()
  const authCtx = useContext(AuthContext)

  const leaveRoom = () => {
    socket.emit("leaveRoom", {token: authCtx.token, roomId: id})
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
    <Container style={{ width: "100%",  minHeight: "30em", paddingTop: "5%"  }}>
        <Row>
            <Col style={{padding: "5px"}}>
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
            <Button size="md" variant="primary" style={{ float: "right", marginLeft:"1em", width:"8em"}} onClick={() => startGame()}>Start game</Button>
            <Button size="md" variant="primary" style={{float:"right", width:"8em"}} onClick={() => leaveRoom()}>Return</Button>
            </Col>
        </Row>
    </Container>
  )
}