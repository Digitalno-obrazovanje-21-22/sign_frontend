import React from "react";
import { baseUrl, urls } from "../utils/baseUrls";
import axios from "axios";
import {Card, Button, Container, Row, Col} from "react-bootstrap";

class ChoosingRoomPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            rooms: [{id: 1, name:"room1", users:[{name:"Ivo"}, {name:"Marko"}, {name:"Ivo"}, {name:"Ivo"}, {name:"Ivo"}]}, {id:2, name:"room2", users:[{name:"Ivo"}]}, {id: 3, name:"room3", users:[]},]
        };
    }

    componentDidMount() {
        this.fetchAvailableRooms();
    }

    fetchAvailableRooms = () => {
        axios.get(baseUrl + "/" + urls.roomUrl)
          .then(response => {
            console.log(response);
            this.setState({rooms: response.data})
          })
    }

    joinRoom = () => {
        console.log("Sending req to BE")
        axios.post( `${baseUrl + "/" + urls.joinRoomUrl.replace(":userId", this.state.userId)}`)
            .then(response => {
                console.log(response);
                this.setState({rooms: response.data})
            })
    }

    createRoom = () => {
        axios.post(baseUrl + "/" + urls.roomUrl)
            .then(response => {
                console.log(response)
            })
    }

    render() {
        return(
            <Container style={{width:"45em"}}>
                <Row>
                    <Col><h3>Choose room</h3></Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => this.createRoom()} href="/waiting-room" size="md" style={{float:"right"}}>
                                Create room
                        </Button>
                    </Col>
                </Row>    
                <Row>
                    {this.state.rooms.map((room,i) => {
                        return (
                            <Card style={{ width: '15rem', marginLeft:"2em", marginTop:"2em", marinRight:"2em", backgroundColor:room.users.length < 5 ? "rgb(128, 204, 255, 0.3)" : "rgb(128, 204, 255)" }}>
                                <Card.Body>
                                    <Card.Title>{room.name}</Card.Title>
                                    <Card.Text>Number of joined users: {room.users.length}/5</Card.Text>
                                    <Button variant="primary" onClick={() => this.joinRoom()} href="/waiting-room"  disabled={room.users.length >= 5 ? true : false}>Join</Button>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>
                
            </Container>
        )
    }
}

export {ChoosingRoomPage}