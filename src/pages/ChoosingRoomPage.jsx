import React from "react";
import { baseUrl, urls } from "../utils/baseUrls";
import axios from "axios";
import {Card, Button, Container, Row, Col} from "react-bootstrap";

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
            this.setState({rooms: response.data})
          })
    }

    joinRoom = (roomId) => {
        axios.post( `${baseUrl + "/" + urls.joinRoomUrl.replace(":userId", this.state.userId).replace(":roomId", roomId)}`)
            .then(response => {
                console.log(response.data);
                this.setState({rooms: response.data})
            })
    }

    createRoom = () => {
        axios.post(baseUrl + "/" + urls.roomUrl)
            .then(response => {
                console.log(response.data)
                this.setState({
                    rooms: [...this.state.rooms, response.data]
                })
            })
    }

    render() {
        return(
            <Container style={{width:"55em", paddingTop:"1em", paddingBottom:"2em", background:"rgb(128, 204, 255, 0.3)"}} className="justify-content-md-center">
                <Row>
                    <Col style={{textAlign:"center"}}><h3>Choose room</h3></Col>
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
                            <Card style={{ width: '15rem', marginLeft:"2em", marginTop:"2em", marinRight:"2em", backgroundColor:"rgb(128, 204, 255, 0.5)" }}>
                                <Card.Body>
                                    <Card.Title>{room.name}</Card.Title>
                                    <Card.Text>Number of joined users: 0/5</Card.Text>
                                    <Button id={room.id} variant="primary" onClick={(event) => this.joinRoom()} href="/waiting-room"  disabled={false}>Join</Button>
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