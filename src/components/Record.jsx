import { useState } from "react"
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap"
import { useRandomSign } from "../utils/http"
import { RecordingComponent } from "./Recording/RecordingComponent"
import TimerComponent from "./Timer/TimerComponent"

export const Record = ({socket}) => {
  const [recording, setRecording] = useState(true)
  const { data, loading, error } = useRandomSign()

  if(!!loading || !data) {
    return <Spinner/>
  }

  if(!!error) {
    return <div>ERROR</div>
  }

  return (
    <Container style={{ width: "100%", paddingTop: "1em", minHeight: "40em", height: "auto", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
      <Row>
        <Alert variant={"Recording"} style={{ textAlign: "center" }}>
          <TimerComponent timerInit={"00:00:03"} setRecording={setRecording}/>
        </Alert>
      </Row>
      
      <Container>
            <Row style={{ textAlign: "center" }}><h4>Sign: {data.name}</h4><hr/></Row>
            <Row>
                <Col><RecordingComponent sign={data.name} socket={socket} recording={recording}/></Col>
            </Row>
        </Container>
    </Container>
  )
}