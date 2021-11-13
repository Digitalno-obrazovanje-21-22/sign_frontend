import React from 'react'
import { urls } from '../utils/baseUrls'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import axiosInstance from '../axiosInstance/axiosInstance'

class ChoosingRoomPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 1,
      rooms: [],
    }
  }

  componentDidMount() {
    this.fetchAvailableRooms()
  }

  fetchAvailableRooms = () => {
    axiosInstance.get(urls.roomUrl).then((response) => {
      this.setState({ rooms: response.data })
    })
  }

  joinRoom = (roomId, roomIndex) => {
    const data = {
      userId: this.state.userId,
      roomId: roomId,
      isOwner: false,
      score: 0,
    }

    axiosInstance.post(urls.roomParticipantUrl, data).then((response) => {
      // const newParticipant = response.data
    })
  }

  createRoom = () => {
    axiosInstance.post(urls.roomUrl).then(
      (response) => {
        this.setState({
          rooms: [...this.state.rooms, response.data],
        })
        this.joinRoom(response.data.id)
      },
      (error) => console.log(error),
    )
  }

  render() {
    return (
      <Container
        style={{ width: '55em', paddingTop: '1em', paddingBottom: '2em', background: 'rgb(128, 204, 255, 0.3)' }}
        className='justify-content-md-center'
      >
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h3>Choose room</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => this.createRoom()} href='/waiting-room' size='md' style={{ float: 'right' }}>
              Create room
            </Button>
          </Col>
        </Row>
        <Row>
          {this.state.rooms.map((room, roomIndex) => {
            return (
              <Card
                style={{
                  width: '15em',
                  marginLeft: '2em',
                  marginTop: '2em',
                  marinRight: '2em',
                  backgroundColor: room.roomParticipants.length < 5 ? 'rgb(128, 204, 255, 0.3)' : 'rgb(128, 204, 255)',
                }}
              >
                <Card.Body>
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>Number of joined users: {room.roomParticipants.length}/5</Card.Text>
                  <Button
                    href='/waiting-room'
                    variant='primary'
                    onClick={(roomIndex) => this.joinRoom(room.id, roomIndex)}
                    disabled={room.roomParticipants.length >= 5}
                  >
                    Join
                  </Button>
                </Card.Body>
              </Card>
            )
          })}
        </Row>
      </Container>
    )
  }
}

export { ChoosingRoomPage }
