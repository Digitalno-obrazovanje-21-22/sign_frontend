import { Container, Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import TimerComponent from "../Timer/TimerComponent";
const GuessingComponent = ({ videoUrl, socket, token, sign }) => {

    const [answer, setAnswer] = useState();
    const [allAnswers, setAllAnswers] = useState("");
    const [guessing, setGuessing] = useState(true)

    const setAnswerValue = (text) => {
        setAnswer(text);
        console.log(text);
    }

    const appendAnswer = () => {
        (allAnswers==="") ? setAllAnswers(answer) : setAllAnswers(allAnswers + "\n" + answer);
        setAnswer("");
    }

    useEffect(() => {
        if(!guessing) {
            setTimeout(() => {
                socket.emit("setPoints", {token, guessed: allAnswers.includes(sign) })
            }, 2000)
        }
    }, [guessing])

    return (
        <Container >
            <Row>
                <Alert variant={"Recording"} style={{ textAlign: "center" }}>
                    <TimerComponent timerInit={"00:00:10"} setRecording={setGuessing}/>
                </Alert>
            </Row>
            <Row style={{ textAlign: "center" }}><h4>{guessing ? "Guess the sign!" : "Guessing finished!"}</h4></Row><hr />
            <Row>
                <video src={videoUrl} width={500} height={500} autoPlay playsInline loop muted/>
            </Row>
            <Row>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <form >
                        <input disabled={!guessing} style={{ width: "15em", backgroundColor:"rgb(128, 204, 255, 0.7)", marginBottom:"1em" }} type="text" name="answer" value={answer} onChange={(e) => setAnswerValue(e.target.value)} />
                        <Button onClick={() => appendAnswer()} size="md" style={{ backgroundColor: "#0099cc", border: "#007399" }}>Send</Button>
                    </form>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <textarea readOnly style={{ width: "18em", height:"10em", backgroundColor:"rgb(128, 204, 255, 0.7)" }} value={allAnswers}></textarea>
                </div>

            </Row>


        </Container>
    )
}

export default GuessingComponent;