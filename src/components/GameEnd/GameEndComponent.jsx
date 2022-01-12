import { useEffect, useState } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { baseUrl, urls } from '../../utils/baseUrls'
import axios from 'axios'
import { useHistory } from 'react-router'

export const GameEndComponent = ({ roomId, socket, leader, token }) => {
  const [roomParticipants, setRoomParticipants] = useState(null)
  const history = useHistory()

  const fetchRoomParticipants = () => {
    axios.get(baseUrl + urls.roomUrl + '/' + roomId).then((response) => {
      setRoomParticipants(response.data.roomParticipants)
      console.log(response.data.roomParticipants)
    })
  }

  useEffect(() => {
    fetchRoomParticipants()
  }, [])

  console.log(leader)
  console.log(localStorage.getItem('userId'))

  return (
    <Container>
      <Row>
        <Container style={{ marginTop:"10%", width: '70%', padding: '2em' }}>
          <Row style={{ textAlign: 'center' }}>
            <Col>
              <h3>{leader == -1 ? 'Game end' : 'End round'}</h3>{' '}
            </Col>
            <br />
          </Row>
          {roomParticipants ? (
            <>
              <Row>
                <div className='row'>
                  <div className='col'>
                    <div className='card'>
                      <div className='card-body'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <td>#</td>
                              <td>User</td>
                              <td>Score</td>
                            </tr>
                          </thead>
                          <tbody>
                            {roomParticipants.map((roomParticipant, i) => {
                              return (
                                <tr>
                                  <th>{++i}</th>
                                  <th>
                                    {roomParticipant.user.firstName} {roomParticipant.user.lastName}
                                  </th>
                                  <th>{roomParticipant.score}</th>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Row>
            </>
          ) : null}
          {leader == localStorage.getItem('userId') && (
            <Row style={{ textAlign: 'center' }}>
              <Button
                size='md'
                style={{ backgroundColor: '#0099cc', marginRight: '1em', width: '8em' }}
                onClick={() => socket.emit('playGame', { token, roomId })}
              >
                Next round
              </Button>
              <Button size='md' style={{ backgroundColor: '#0099cc', width: '8em' }} onClick={() => socket.emit('endGame', { roomId })}>
                End game
              </Button>
            </Row>
          )}
          {leader == -1 && (
            <Row style={{ textAlign: 'center' }}>
              <Button size='md' style={{ backgroundColor: '#0099cc', marginRight: '1em', width: '8em' }} onClick={() => history.push('/rooms')}>
                Back to room selection
              </Button>
            </Row>
          )}
        </Container>
      </Row>
    </Container>
  )
}
