import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TimerComponent from "../components/Timer/TimerComponent";
import WaitingParticipantsComponent from "../components/WaitingParticipants/WaitingParticipantsComponent";


class StartGamePage extends React.Component {
    constructor(props) {
        super(props);
        //TODO: opet potrebno dodat context
        this.state = {
            roomId:1
        };
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.history.push('/recording')
        }, 5000)
    }

    render() {
        return(
            <Container style={{width:"55em", height:"auto", minHeight:"30em", background:"rgb(128, 204, 255, 0.3)"}}>
                <Row>
                    <Col>
                    <h4>Game is starting in: </h4>
                    </Col>
                    <Col>
                        <TimerComponent></TimerComponent>
                    </Col>
                </Row>
                <Row>
                    <h4> </h4>
                </Row>
                <Row>
                    <Col>
                        <h3>First player: </h3>
                    </Col>
                    <Col>
                    </Col>                  
                </Row>
                <Row>
                    <WaitingParticipantsComponent roomId={this.state.roomId}></WaitingParticipantsComponent>
                </Row>
            </Container>
        )
    }
}

export default StartGamePage;