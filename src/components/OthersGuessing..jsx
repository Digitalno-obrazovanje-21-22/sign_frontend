import { useEffect, useState } from "react"
import { Alert, Container, Row } from "react-bootstrap"
import TimerComponent from "./Timer/TimerComponent"

export const OthersGuessing = ({socket, roomId, token}) => {
  const [guessing, setGuessing] = useState(true)

  useEffect(() => {
    if(!guessing) {
      socket.emit("changePlayer", {token, roomId})
    }
  }, [guessing])

  return (
    <Container>
            <Row>
                <Alert variant={"Recording"} style={{ textAlign: "center" }}>
                    <TimerComponent timerInit={"00:00:10"} setRecording={setGuessing}/>
                </Alert>
            </Row>
            <Row style={{ textAlign: "center" }}>
              <h4>Others are guessing!</h4>
            </Row>
        </Container>
  )
}