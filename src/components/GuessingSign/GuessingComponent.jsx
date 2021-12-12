import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
const GuessingComponent = ({ }) => {

    const [answer, setAnswer] = useState();
    const [allAnswers, setAllAnswers] = useState(null);

    const setAnswerValue = (text) => {
        setAnswer(text);
        console.log(text);
    }

    const appendAnswer = () => {
        (allAnswers === null) ? setAllAnswers(answer) : setAllAnswers(allAnswers + "\n" + answer);
        setAnswer("");
    }

    return (
        <Container >
            <Row style={{ textAlign: "center" }}><h4>Guess the sign!</h4></Row><hr />
            <Row>
               


            </Row>
            <Row>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <form >
                        <input style={{ width: "15em", backgroundColor:"rgb(128, 204, 255, 0.7)", marginBottom:"1em" }} type="text" name="answer" value={answer} onChange={(e) => setAnswerValue(e.target.value)} />
                        <Button onClick={() => appendAnswer()} size="md" style={{ backgroundColor: "#0099cc", border: "#007399" }}>Send</Button>
                    </form>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <textarea style={{ width: "18em", height:"10em", backgroundColor:"rgb(128, 204, 255, 0.7)" }} value={allAnswers}></textarea>
                </div>

            </Row>


        </Container>
    )
}

export default GuessingComponent;