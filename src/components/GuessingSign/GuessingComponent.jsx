import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

const GuessingComponent = ({ guessingStopped, correctSign, signs }) => {

    const [alertVariant, setAlertVariant] = useState("error");
    const [alertMessage, setAlertMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState("something");

    useEffect(() => {
        if(guessingStopped){
            console.log(localStorage.getItem("answer"))
            if (localStorage.getItem("answer") === correctSign) {
                setAlertVariant("success");
                setAlertMessage("Good job! Correct answer is " + correctSign);
            }
            else {
                setAlertVariant("danger");
                setAlertMessage("Your answer is incorrect. Correct answer is: " + correctSign);
            }
            localStorage.setItem("answer", "")
        }
    }, [guessingStopped]);

    const onValueChange = (value) => {
        setSelectedOption(value)
        localStorage.setItem("answer", value);
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
                <Container style={{ textAlign: "center", width: "30em", backgroundColor: "rgb(198, 213, 216, 0.3)", padding: "2em", border: "1px solid black" }}>
                    <Row >
                        <h3>Choose your answer:</h3><hr></hr>
                    </Row>
                    <Row>
                        <Container style={{ textAlign: "left", marginLeft: "5em" }}>
                            <form >
                                {signs.map((sign, i) => {
                                    return (
                                        <div className="radio">
                                            <label>
                                                <input
                                                    type="radio"
                                                    value={sign}
                                                    checked={selectedOption === sign}
                                                    onChange={(e) => onValueChange(e.target.value)}
                                                />
                                                {sign}
                                            </label>
                                        </div>
                                    )
                                })}
                            </form>
                        </Container>

                    </Row>

                </Container>
            </Row>

        </Container>
    )
}

export default GuessingComponent;