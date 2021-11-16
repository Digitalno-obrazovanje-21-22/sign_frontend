//import axios from "axios";
import React from "react";
import {Container, Button, Col, Row} from "react-bootstrap";
import BackToAllRoomsComponent from "../components/WaitingParticipants/BackToAllRoomsComponent";
import WaitingParticipantsComponent from "../components/WaitingParticipants/WaitingParticipantsComponent";
//import { baseUrl, urls } from "../utils/baseUrls";

class WaitingRoomPage extends React.Component {
    constructor(props) {
        super(props);
        //TODO: potrebno je provuc kontekst da se pamti room id i da se zacrni soba 
        //u kojoj se pocelo igrat prije 5/5
        //const context = useContext()
        this.state = {
            roomId: localStorage.getItem("chosenRoomId"),
            joinedUsers: []
        };
    }

    // fetchJoinedUsers = () => {
    //     axios.get(baseUrl + urls.roomUrl + "/" + this.state.roomId)
    //         .then(response => {
    //             this.setState({
    //                 joinedUsers: response.data
    //             })
    //         })
    // }

    render () {
        return (
            <Container style={{width:"55em", height:"auto", minHeight:"30em", background:"rgb(128, 204, 255, 0.3)"}}>
                <Row>
                    <Col>
                        <h4>Waiting for other users to join..</h4>
                        <h5>Currently here:</h5>
                    </Col>
                </Row>
                <Row style={{textAlign:"center", marginLeft:"8em"}}>
                	<WaitingParticipantsComponent ></WaitingParticipantsComponent>
                </Row>
                <Row>
                    <Col>
                        <Button  size="md" style={{float:"right"}} href="/waiting-start-game">Start game</Button>
                    </Col>
                </Row>         
                <Row>
                    <Col>
                        <BackToAllRoomsComponent></BackToAllRoomsComponent>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default WaitingRoomPage;