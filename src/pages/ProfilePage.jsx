import { Container, Row, Col } from "react-bootstrap";

export const ProfilePage = () => {

    const user = {
        id: localStorage.getItem("userId"),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
    }

    return (
        <div>
            <Container className='card' style={{ marginTop: "3em" }}>
                <Row>
                    <Col><label>Username:</label> {user.firstName + " " + user.lastName}</Col>
                </Row>
                <Row>
                    <Col>
                        <label>Email:</label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Score:</label>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}