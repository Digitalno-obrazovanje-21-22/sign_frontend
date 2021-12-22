//import axios from "axios";
import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";
import BackToAllRoomsComponent from "../components/WaitingParticipants/BackToAllRoomsComponent";
import WaitingParticipantsComponent from "../components/WaitingParticipants/WaitingParticipantsComponent";

class WaitingRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: localStorage.getItem("chosenRoomId"),
            joinedUsers: []
        };
    }

    render() {
        return (
            <Container style={{ width: "60em", height: "auto", minHeight: "30em", background: "rgb(128, 204, 255, 0.3)" }}>
                <Row>
                    <Col>
                        <h4>Waiting for other users to join..</h4>
                        <h5>Currently here:</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={7}>
                        <Row style={{ textAlign: "center", marginLeft: "8em" }}>
                            <WaitingParticipantsComponent ></WaitingParticipantsComponent>
                        </Row>
                    </Col>
                    <Col>
                    <Button size="md" style={{ float: "right", backgroundColor:"#0099cc", marginLeft:"1em", width:"8em"}} href="/waiting-start-game">Start game</Button>
                    <BackToAllRoomsComponent></BackToAllRoomsComponent>
                    </Col>
                </Row>

            </Container>
        )
    }
}

export default WaitingRoomPage;