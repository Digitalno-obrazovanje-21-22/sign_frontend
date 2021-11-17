import React, { useContext } from 'react'
import { baseUrl, urls } from '../utils/baseUrls'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import axiosInstance from '../axiosInstance/axiosInstance'
import RoomContext, { RoomContextProvider } from '../store/room-context'
import  authContext  from "../store/auth-context"; 
import { couldStartTrivia } from 'typescript'

class ChoosingRoomPage extends React.Component {
  static contextType = authContext;

  constructor(props) {
    super(props)
    this.state = {
      //TODO: fetch authenticated user
      userId: 1,
      rooms: []
    }
  }

  componentDidMount() {
    //TODO: potrebno je ovo izmjenit da u kontekstu cuvamo userid kako bi mogli svaki puta s novim zvat
    //ili preko tekoena
    const user = this.context;
    console.log("User iz mounta:  " + user);
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
    localStorage.setItem('roomId', roomId)
    
    axiosInstance.post(urls.roomParticipantUrl, data).then((response) => {
        console.log(response.data)
    })

    //store chosenRoomId in localStorage
    localStorage.setItem("chosenRoomId", roomId);
  }

  createRoom = () => {
    //create room
     axiosInstance.post(urls.roomUrl).then(
      (response) => {
        const roomId = response.data.id;
        this.joinRoom(roomId)
        localStorage.setItem('roomId', response.data.id);
      },
      (error) => console.log(error),
    )
    this.props.history.push('/waiting-room');
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
            <Button onClick={() => this.createRoom()} size='md' style={{ float: 'right' }}>
              Create room
            </Button>
          </Col>
        </Row>
        <Row>
          {this.state.rooms.map((room, roomIndex) => {
            return (
              <Card
                key={room.id}
                style={{
                  width: '15em',
                  marginLeft: '2em',
                  marginTop: '2em',
                  marinRight: '2em',
                  backgroundColor: room.roomParticipants.length < 5 ? 'rgb(128, 204, 255, 0.3)' : 'rgb(128, 204, 255)',
                }}
              >
                <Card.Body key={room.id}>
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
