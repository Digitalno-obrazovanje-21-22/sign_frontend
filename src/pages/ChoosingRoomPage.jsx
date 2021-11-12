import React from "react";
import { baseUrl, urls } from "../utils/baseUrls";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

class ChoosingRoomPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: 1,
            rooms: []
        };
    }

    componentDidMount() {
        this.fetchAvailableRooms();
    }

    fetchAvailableRooms = () => {
        axios.get(baseUrl + "/" + urls.roomUrl)
            .then(response => {
                console.log(response);
                this.setState({ rooms: response.data })
            })
    }

    joinRoom = (roomId) => {
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        const data = {
            userId: this.state.userId,
            roomId: roomId,
            isOwner: false,
            score: 0
        }
        console.log(data);
        axios({
            method: "post",
            url: baseUrl + "/" + urls.roomParticipantUrl,
            data: data,
            config: config
        }).then(response => {
            const newParticipant = response.data;
            console.log(newParticipant);
            //TODO: save response to state
        }
        );
    }

    createRoom = () => {
        axios.post(baseUrl + "/" + urls.roomUrl)
            .then(response => {
                console.log(response.data)
                this.setState({
                    rooms: [...this.state.rooms, response.data]
                })
                this.joinRoom(response.data.id)
            }, (error) => console.log(error))
    }

    render() {
        return (
            <Container style={{ width: "55em", paddingTop: "1em", paddingBottom: "2em", background: "rgb(128, 204, 255, 0.3)" }} className="justify-content-md-center">
                <Row>
                    <Col style={{ textAlign: "center" }}><h3>Choose room</h3></Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => this.createRoom()} href="/waiting-room" size="md" style={{ float: "right" }}>
                            Create room
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {this.state.rooms.map((room, i) => {
                        return (
                            <Card style={{ width: '15rem', marginLeft: "2em", marginTop: "2em", marinRight: "2em", backgroundColor: room.roomParticipants.length < 5 ? "rgb(128, 204, 255, 0.3)" : "rgb(128, 204, 255)" }}>
                                <Card.Body>
                                    <Card.Title>{room.name}</Card.Title>
                                    <Card.Text>Number of joined users: {room.roomParticipants.length}/5</Card.Text>
                                    <Button value={room.id} variant="primary" onClick={(event) => this.joinRoom(event.target.value)} disabled={room.roomParticipants.length >= 5}>Join</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>

            </Container>
        )
    }
}

export { ChoosingRoomPage }