import { Container, Row, Alert, Toast, ToastHeader, ToastBody, Button, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import TimerComponent from "../Timer/TimerComponent";
import videoPaths from '../../assets/videoPaths'
const GuessingComponent = ({ videoUrl, socket, token, sign, roomId }) => {
    const [guessing, setGuessing] = useState(true)
    const [selectedOption, setSelectedOption] = useState(null);
    const [video, setVideo] = useState(null)
    const [options, setOptions] = useState([sign, ...videoPaths.filter(val => val.name != sign).map(val => val.name).slice(0, 3)])

    const shuffle= (array)=> {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    useEffect(() => {
        if (!guessing) {
            setTimeout(() => {
                socket.emit("setPoints", { token, roomId, guessed: selectedOption === sign, sign })
            }, 2000)
        }
    }, [guessing])

    useEffect(() => {
        fetch(videoUrl).then(data => data.blob()).then(blob => setVideo(blob))
    }, [])

    useEffect(() => {
        shuffle(options)
    }, [options])

    return (
        <Container >
            <Row style={{ textAlign: "center", marginTop:"1em" }}><h4>{guessing ? "Guess the sign!" : "Guessing finished!"}</h4></Row>

                {guessing &&
                    <Alert variant={"Recording"} style={{ textAlign: "center" }}>
                        <TimerComponent timerInit={"00:00:10"} setRecording={setGuessing} />
                    </Alert>}
                {!guessing &&
                    <Alert variant={selectedOption === sign ? "success" : "danger"} style={{ textAlign: "center" }}>
                        {selectedOption == sign ? "Good job! Correct answer is " + sign : "Your answer is incorrect. Correct answer is: " + sign}
                    </Alert>}
            <Row>  <hr />
                {!!video && <video src={URL.createObjectURL(video)} width={520} height={480} autoPlay playsInline loop muted />}
            </Row>
            <Row>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <ListGroup>
                        <Row>
                            {options.map((option, i) => {
                                return (
                                    <>
                                        <div className="col-sm-6" onClick={() => setSelectedOption(option)}>
                                            <Button style={{ backgroundColor: selectedOption === option ? 'rgb(13,110,253)' : 'rgb(13,110,253,0.7)', width: "100%", marginTop: "1em", marginRight: "1em" }} value={option} active={option === selectedOption}>{option}</Button>
                                        </div></>
                                )
                            })}
                        </Row>
                    </ListGroup>

                </div>

            </Row>

        </Container>
    )
}

export default GuessingComponent;