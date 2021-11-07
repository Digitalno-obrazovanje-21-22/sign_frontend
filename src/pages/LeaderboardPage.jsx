import React from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import {Container, Row, Col, Button} from "react-bootstrap";
class LeaderboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    render() {
        return (
            <Container className="justify-content-md-center" style={{ width:"50em", height:"30em", marginBottom:"5em", background:"rgb(128, 204, 255, 0.3)"}}>
                <br />
                <Row>
                    <Col>
                        <h2>Leaderboard</h2>
                    </Col>
                    <Col >
                        <Button  style={{float:"right"}}>
                            Home page
                        </Button>
                    </Col>
                 </Row>
                <Row >  
                    <Leaderboard users={this.state.users}></Leaderboard>
                </Row>
            </Container>
        
        )
    }
}

export default LeaderboardPage;