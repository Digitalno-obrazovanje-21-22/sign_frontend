import { Spinner, Modal, Container, Row, Col, Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router'
import HowToPlay from '../components/InstructionsComponent/HowToPlay'
import { createRoom, useRooms } from '../utils/http'

export const RoomsPage = () => {
  const { data: rooms, error, loading } = useRooms({ refetch: true })
  const history = useHistory()

  const newRoom = async () => {
    const { data: createdRoom } = await createRoom()
    history.push(`/rooms/${createdRoom.id}`)
  }

  if (loading || !rooms) {
    return <Spinner />
  }

  if (error) {
    return (
      <Modal centered>
        <div>Error</div>
      </Modal>
    )
  }

  return (
    <Container
      style={{
        width: '100%',
        paddingTop: '1em',
        paddingBottom: '2em',
        backgroundPosition: 'center',
           }}
      className='justify-content-md-center'
    >
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h3>Choose or create room to start a game</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={newRoom} size='lg' style={{ float: 'right'}}>
           <h3> Create room</h3>
          </Button>
        </Col>
      </Row>
      <Row style={{marginTop:'1%'}}>
          <HowToPlay shouldFloat={true}/>
      </Row>
      <Row>
        {rooms.filter((room) => room.isOver === false).map((room, roomIndex) => {
          return (
            <Card
              key={roomIndex}
              style={{
                width: '15em',
                marginLeft: '2em',
                marginTop: '2em',
                marinRight: '2em',
                backgroundColor: room.roomParticipants.length >= 5 ? 'rgb(13,110,253,0.2)' : 'white',
                color:  "black"
              }}
            >
              <Card.Body key={room.id}>
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>Players in room: {room.roomParticipants.length}/5</Card.Text>
                <Button
                  variant='primary'
                  style={{
                    float: 'right'
                  }}
                  onClick={() => {
                    const permissions = navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                    permissions.then((stream) => {
                      history.push(`/rooms/${room.id}`)
                    })
                  }}
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
