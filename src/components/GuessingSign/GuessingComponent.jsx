import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useState } from "react";
const GuessingComponent = ({ sign }) => {

    const [answer, setAnswer] = useState();
    const [allAnswers, setAllAnswers] = useState("");
    const [alertVariant, setAlertVariant] = useState("error");
    const [alertMessage, setAlertMessage] = useState("");

    const setAnswerValue = (text) => {
        setAnswer(text);
        console.log(text);
    }

    const appendAnswer = (event) => {
        if (answer === sign) {
            setAlertVariant("success");
            setAlertMessage("Good job! " + "Correct answer is " + answer);
        }
        else {
            setAlertVariant("danger");
            setAlertMessage( "Incorrect answer. Please try again...");
        }
        (allAnswers === "") ? setAllAnswers("User1: " + answer) : setAllAnswers(allAnswers + "\nUser1: " + answer);
        setAnswer("");
    }

    return (
        <Container >
            <Row style={{ textAlign: "center" }}><h4>Guess the sign!</h4></Row><hr />
            <Row>



            </Row>
            <Row>
                <Container style={{textAlign:"center"}}>
                    <Alert variant={alertVariant}>
                        {alertMessage}
                    </Alert>
                </Container>
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