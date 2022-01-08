import { Spinner, Modal, Container, Row, Col, Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router'
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
    <Container style={{ width: '55em', paddingTop: '1em', paddingBottom: '2em', background: 'rgb(128, 204, 255, 0.3)' }} className='justify-content-md-center'>
      <Row>
        <Col style={{ textAlign: 'center' }}>
          <h3>Choose room</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={newRoom} size='md' style={{ float: 'right' }}>
            Create room
          </Button>
        </Col>
      </Row>
      <Row>
        {rooms.map((room, roomIndex) => {
          return (
            <Card
              key={roomIndex}
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
                  variant='primary'
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
