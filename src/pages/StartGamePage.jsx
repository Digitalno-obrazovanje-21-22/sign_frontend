import React from "react";
import { Col, Container, Row } from "react-bootstrap";


class StartGamePage extends React.Component {
    constructor(props) {
        super(props);
        //TODO: opet potrebno dodat context
        this.state = {
            roomId:1
        };
    }

    render() {
        return(
            <Container style={{width:"55em", height:"auto", minHeight:"30em", background:"rgb(128, 204, 255, 0.3)"}}>
                <Row>
                    <Col>
                    <h4>Game is starting in: </h4>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default StartGamePage;