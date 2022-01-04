import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { baseUrl, urls } from "../../utils/baseUrls";
import axios from "axios";
import { useHistory } from "react-router";

export const GameEndComponent = ({ roomId, socket, leader, token }) => {

    const [roomParticipants, setRoomParticipants] = useState(null);
    const history = useHistory()

    const fetchRoomParticipants = () => {
        axios.get(baseUrl + urls.roomUrl + "/" + roomId)
            .then(response => {
                setRoomParticipants(response.data.roomParticipants)
                console.log(response.data.roomParticipants)
            })
    }

    useEffect(() => {
        fetchRoomParticipants();
    }, [])

    console.log(leader)
    console.log(localStorage.getItem("userId"))

    return (
        <Container>
            <Row>
                <Container style={{ width: "35em", backgroundColor: "rgb(198, 213, 216, 0.3)", padding: "2em", border: "1px solid black" }}>
                    <Row style={{textAlign:"center"}} >
                        <Col><h5>{leader == -1 ? 'Game end' : 'Round end'}</h5> </Col><br />
                    </Row>
                    {roomParticipants ?
                        <>
                            <Row>
                                <Table striped bordered hover variant="dark" style={{ textAlign: "center" }} >
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>User</td>
                                            <td>Score</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {roomParticipants.map((roomParticipant, i) => {
                                            return (
                                                <tr>
                                                    <th>{++i}</th>
                                                    <th>{roomParticipant.user.firstName} {roomParticipant.user.lastName}</th>
                                                    <th>{roomParticipant.score}</th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Row></>
                        : null}
                    {leader == localStorage.getItem("userId") &&
                        <Row style={{textAlign:"center"}} >
                            <Button size="md" style={{ backgroundColor:"#0099cc", marginRight:"1em", width:"8em"}} onClick={() => socket.emit("playGame", {token, roomId})}>Next round</Button>
                            <Button size="md" style={{ backgroundColor:"#0099cc", width:"8em"}} onClick={() => socket.emit("endGame", {roomId})}>End game</Button>
                        </Row>
                    }
                    {leader == -1 && 
                        <Row style={{textAlign:"center"}} >
                            <Button size="md" style={{ backgroundColor:"#0099cc", marginRight:"1em", width:"8em"}} onClick={() => history.push('/rooms')}>Back to room selection</Button>
                        </Row>
                    }
                </Container>
            </Row>
        </Container>
    )
}