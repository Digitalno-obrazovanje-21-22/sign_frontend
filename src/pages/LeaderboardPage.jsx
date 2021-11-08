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
            <Container style={{ width:"55em", height:"30em", paddingTop:"1em", paddingLeft:"2em", paddingRight:"2em", paddingBottom:"2em", background:"rgb(128, 204, 255, 0.3)"}}  className="justify-content-md-center" >
                <br />
                <Row >
                    <Col>
                        <div style={{textAlign:"center"}}>
                            <h2>Leaderboard</h2>
                        </div>
                        <Button  style={{float:"right"}} size="md" href="/home-page">
                            Home page
                        </Button>
                    </Col>
                </Row>
                <Row  style={{textAlign:"center", marginLeft:"8em"}} >  
                    <Leaderboard users={this.state.users}></Leaderboard>
                </Row>
            </Container>
        
        )
    }
}

export default LeaderboardPage;