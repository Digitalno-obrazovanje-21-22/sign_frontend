import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import VideoComponent from '../Recording/VideoComponent'

const StartingPageContent = ({ user }) => {
  const [videos] = useState([
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/109898.mp4',
      name: 'Dobar dan',
    },
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/109919.mp4',
      name: 'Bok',
    },
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/456604.mp4',
      name: 'Kako si?',
    },
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/49162.mp4',
      name: 'Okej',
    },
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/153329.mp4',
      name: 'Dobro',
    },
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/93725.mp4',
      name: 'Mogu li ti pomoći?',
    },
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/51106.mp4',
      name: 'Da',
    },
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/457104.mp4',
      name: 'Ne',
    },
    {
      url: 'https://media.spreadthesign.com/video/mp4/13/91239.mp4',
      name: 'Gdje je WC?',
    },
  ])

  return (
    <div>
      <Col style={{ textAlign: 'center' }}>
        {' '}
        <h1>Welcome to Signs!</h1>
      </Col>
      <Container>
        <div>
          <b>Username: </b>
          {user.firstName} {user.lastName}
          <br />
          <b>Score: </b>
          {user.score}
        </div>
        <br />
        <Row>
          {videos.map((video, i) => {
            return <VideoComponent key={i} videoUrl={video.url} name={video.name}></VideoComponent>
          })}
        </Row>
      </Container>
    </div>
  )
}

export default StartingPageContent
