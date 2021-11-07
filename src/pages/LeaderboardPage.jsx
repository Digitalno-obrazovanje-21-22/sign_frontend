import React from "react";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import {Container, Row} from "react-bootstrap";
class LeaderboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    render() {
        return (
            <Container style={{width:"50em"}} >
                <Row>
                    <h2>Leaderboard</h2>
                </Row>
                <Row >  
                    <Leaderboard users={this.state.users}></Leaderboard>
                </Row>
            </Container>
        
        )
    }
}

export default LeaderboardPage;