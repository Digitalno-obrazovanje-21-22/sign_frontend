import { Container, Row, Alert, Toast, ToastHeader, ToastBody } from "react-bootstrap";
import { useEffect, useState } from "react";
import TimerComponent from "../Timer/TimerComponent";
import videoPaths from '../../assets/videoPaths'
const GuessingComponent = ({ videoUrl, socket, token, sign, roomId }) => {
    const [guessing, setGuessing] = useState(true)
    const [selectedOption, setSelectedOption] = useState(null);
    const [video, setVideo] = useState(null)
    const [options] = useState([sign, ...videoPaths.filter(val => val.name!=sign).map(val => val.name).slice(0,3)])

    useEffect(() => {
        if(!guessing) {
            setTimeout(() => {
                socket.emit("setPoints", {token, roomId, guessed: selectedOption === sign })
            }, 2000)
        }
    }, [guessing])

    useEffect(() => {
        fetch(videoUrl).then(data => data.blob()).then(blob => setVideo(blob))
    }, [])

    return (
        <Container >
            <Row>
                <Alert variant={"Recording"} style={{ textAlign: "center" }}>
                    <TimerComponent timerInit={"00:00:10"} setRecording={setGuessing}/>
                </Alert>
            </Row>
            <Row style={{ textAlign: "center" }}><h4>{guessing ? "Guess the sign!" : "Guessing finished!"}</h4></Row><hr />
            <Row>
                {!!video && <video src={URL.createObjectURL(video)} width={520} height={480} autoPlay playsInline loop muted/>}
            </Row>
            <Row>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <form >
                    {options.map((option, i) => {
                                    return (
                                        <div className="radio">
                                            <label>
                                                <input
                                                    type="radio"
                                                    value={option}
                                                    checked={selectedOption === option}
                                                    onChange={(e) => setSelectedOption(e.target.value)}
                                                />
                                                {option}
                                            </label>
                                        </div>
                                    )
                                })}
                    </form>
                    <Toast show={!guessing}>
                        <ToastHeader>
                        {selectedOption == sign ? "Correct" : "Incorrect"}
                        </ToastHeader>
                        <ToastBody>
                            {selectedOption == sign ? "Good job! Correct answer is " + sign : "Your answer is incorrect. Correct answer is: " + sign}
                        </ToastBody>
                    </Toast>
                    </div>

                    </Row>

                </Container>
    )
}

export default GuessingComponent;