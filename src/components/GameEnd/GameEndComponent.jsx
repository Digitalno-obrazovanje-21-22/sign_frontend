import { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { baseUrl, urls } from "../../utils/baseUrls";
import axios from "axios";

const GameEndComponent = ({ }) => {

    const [roomParticipants, setRoomParticipants] = useState(null);

    //fetch roomId and userId from Context
    const roomId = 1;
    const userId = 1;

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

    return (
        <Container>
            <Row style={{ textAlign: "center" }}><h4>Next round starting in 10 seconds...</h4></Row><hr />
            <Row>
                <Container style={{ width: "35em", backgroundColor: "rgb(198, 213, 216, 0.3)", padding: "2em", border: "1px solid black" }}>
                    <Row style={{textAlign:"center"}} >
                        <Col><h5>ROUND 1</h5> </Col><br />
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

                </Container>
            </Row>
        </Container>
    )
}

export default GameEndComponent;