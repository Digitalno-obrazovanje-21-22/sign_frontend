import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

const GuessingComponent = ({ sign }) => {

    const [alertVariant, setAlertVariant] = useState("error");
    const [alertMessage, setAlertMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState("something");

    useEffect(() => {
        setTimeout(() => {
            console.log("Times up")
            console.log(localStorage.getItem("answer"))
            if(localStorage.getItem("answer")===sign){
                setAlertVariant("success");
                setAlertMessage("Good job! Correct answer is " + sign);
            }
            else{
                setAlertVariant("danger");
                setAlertMessage("Your answer is incorrect. Correct answer is: " + sign);
            }
            localStorage.setItem("answer", "")
        }, 10000)   
    }, []);

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
                <Container style={{ textAlign: "center", width:"30em", backgroundColor:"rgb(198, 213, 216, 0.3)", padding:"2em", border:"1px solid black" }}>
                    <Row >
                        <h3>Choose your answer:</h3><hr></hr>
                    </Row>
                    <Row>
                        <Container style={{textAlign:"left", marginLeft:"5em"}}>
                            <form >
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Happy"
                                            checked={selectedOption === "Happy"}
                                            onChange={(e) => onValueChange(e.target.value)}
                                        />
                                        Happy
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Pain"
                                            checked={selectedOption === "Pain"}
                                            onChange={(e) => onValueChange(e.target.value)}
                                        />
                                        Pain
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                            type="radio"
                                            value="Happy Birthday"
                                            checked={selectedOption === "Happy Birthday"}
                                            onChange={(e) => onValueChange(e.target.value)}
                                        />
                                        Happy Birthday
                                    </label>
                                </div>
                            </form>
                        </Container>

                    </Row>

                </Container>
            </Row>

        </Container>
    )
}

export default GuessingComponent;