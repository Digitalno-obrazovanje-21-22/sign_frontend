import { Button, Card, Col, Container, Dropdown, ListGroup, Nav, Row, Tab } from 'react-bootstrap'
import { useState } from 'react'
import { useContext } from 'react'
import VideoComponent from '../Recording/VideoComponent'
import AuthContext from '../../store/auth-context'
import videosPath from '../../assets/videoPaths'
const StartingPageContent = () => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const [videos] = useState(videosPath)
  const [activeVideo, setActiveVideo] = useState(videos[0])
  return (
    <div>
      <Col style={{ textAlign: 'center' }}>
        <h1>Welcome to Signs!</h1>
      </Col>
      <Container>
        <br />
        <Row>
          <Col lg={4}>
            <Card>
              <Card.Header>Signs</Card.Header>

              <div style={{ overflow: 'scroll', height: '652px' }}>
                <ListGroup>
                  {videos.map((video) => (
                    <div key={video.url} onClick={() => setActiveVideo(video)}>
                      <ListGroup.Item active={video === activeVideo}>{video.name}</ListGroup.Item>
                    </div>
                  ))}
                </ListGroup>
              </div>
            </Card>
          </Col>
          <Col lg={4} style={{ textAlign: 'center', PaddingRight: '2em', paddingBottom: '2em' }}>
            <VideoComponent key={activeVideo.name} videoUrl={activeVideo.url} name={activeVideo.name}></VideoComponent>
          </Col>
          <Col lg={4}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{activeVideo.name}</Card.Title>
                <Card.Text>Video path: {activeVideo.url}</Card.Text>
                <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Statistika</Card.Title>
                <Card.Text>test</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StartingPageContent
