import { Container, Row, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import TimerComponent from "../Timer/TimerComponent";
import videoPaths from '../../assets/videoPaths'
const GuessingComponent = ({ videoUrl, socket, token, sign }) => {
    const [guessing, setGuessing] = useState(true)
    const [selectedOption, setSelectedOption] = useState("something");
    const [options] = useState([sign, ...videoPaths.map(val => val.name).slice(0,3)])

    useEffect(() => {
        alert(selectedOption == sign ? "Good job! Correct answer is " + sign : "Your answer is incorrect. Correct answer is: " + sign)
        if(!guessing) {
            setTimeout(() => {
                socket.emit("setPoints", {token, guessed: selectedOption == sign })
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
                    </div>

                    </Row>

                </Container>
    )
}

export default GuessingComponent;