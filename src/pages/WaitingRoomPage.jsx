import axios from "axios";
import React from "react";
import {Container, Button, Col, Row} from "react-bootstrap";
import { baseUrl, urls } from "../utils/baseUrls";

class WaitingRoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId:null,
            joinedUsers: []
        };
    }

    fetchJoinedUsers = () => {
        axios.get(baseUrl + "/" + urls.roomUrl + "/" + this.state.roomId)
            .then(response => {
                console.log(response);
                this.setState({
                    joinedUsers: response.data
                })
            })
    }

    render () {
        return (
            <Container style={{width:"40em", height:"20em",  background:"rgb(128, 204, 255, 0.3)"}}>
                <Row>
                    <Col>
                        <h4>Waiting for other users to join..</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button  size="md" style={{float:"right"}}>Start game</Button>
                    </Col>
                </Row>         
            </Container>
        )
    }
}

export default WaitingRoomPage;