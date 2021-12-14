import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
const GuessingComponent = ({ }) => {

    const [answer, setAnswer] = useState();
    const [allAnswers, setAllAnswers] = useState("");

    const setAnswerValue = (text) => {
        setAnswer(text);
        console.log(text);
    }

    const appendAnswer = (event) => {
        (allAnswers === "") ? setAllAnswers(answer) : setAllAnswers(allAnswers + "\n" + answer);
        setAnswer("");
    }

    return (
        <Container >
            <Row style={{ textAlign: "center" }}><h4>Guess the sign!</h4></Row><hr />
            <Row>



            </Row>
            <Row>
                <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Form >
                        <Form.Control style={{ marginRight: "1em" }} type="text" placeholder="Enter your answer..." value={answer} onChange={(e) => setAnswerValue(e.target.value)} />
                    </Form>
                    <Button onClick={() => appendAnswer()} size="md" style={{ backgroundColor: "#0099cc", border: "#007399" }}>Send</Button>
                </Container>
                <Container style={{ display: "flex", justifyContent: "center" }}>
                  
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <textarea readOnly style={{ width: "18em", height: "10em", backgroundColor: "rgb(128, 204, 255, 0.4)" }} value={allAnswers}></textarea>
                </div>

                </Container>
            </Row>

        </Container>
    )
}

export default GuessingComponent;