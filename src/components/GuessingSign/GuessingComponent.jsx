import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
const GuessingComponent = ({ sign }) => {

    const [selectedAnswer, setSelectedAnswer] = useState();
    const [alertVariant, setAlertVariant] = useState("error");
    const [alertMessage, setAlertMessage] = useState("");
   
    /*useEffect(() => {
        setTimeout(() => {
            console.log("Times up")
            if(selectedAnswer===sign){
                console.log(sign)
                console.log(selectedAnswer)

                setAlertVariant("success");
                setAlertMessage("Good job! Correct answer is " + sign);
            }
            else{
                setAlertVariant("danger");
                setAlertMessage("Your answer is incorrect..");
            }
        }, 10000)   
    }, []);*/

    const handleClick = (answer) => {
        setSelectedAnswer(answer);
        console.log(selectedAnswer)
    }

    return (
        <Container >
            <Row style={{ textAlign: "center" }}><h4>Guess the sign!</h4></Row><hr />
            <Row>



            </Row>
            <Row>
                <Container style={{ textAlign: "center" }}>
                    <Alert variant={alertVariant}>
                        {alertMessage}
                    </Alert>
                </Container>
                <Container style={{textAlign:"center"}}>
                    <Row >
                        <h3>Choose your answer:</h3>
                    </Row>
                    <Row>
                    <Form>
                        <Form.Check inline
                            label="Happy"
                            value="Happy"
                            type="radio"
                            checked={selectedAnswer === "Happy"}
                            onClick={() => handleClick("Happy")}
                            >
                        </Form.Check>
                        <Form.Check inline
                            label="Pain"
                            type="radio"
                            checked={selectedAnswer === "Pain"}
                            onClick={() => handleClick("Pain")}
                            >
                        </Form.Check>
                        <Form.Check inline
                            label="Good Afternoon"
                            type="radio"
                            checked={selectedAnswer === "Good Afternoon"}
                            onClick={() => handleClick("Good Afternoon")}>
                        </Form.Check>
                        <Form.Check inline
                            label="Happy birthday"
                            type="radio"
                            checked={selectedAnswer === "Happy birthday"}
                            onClick={() => handleClick("Happy birthday")}>
                        </Form.Check>

                    </Form>
                    </Row>
                   
                </Container>
            </Row>

        </Container>
    )
}

export default GuessingComponent;