import { Button, Card, Col, Container, Dropdown, ListGroup, Nav, Row, Tab } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import VideoComponent from '../Recording/VideoComponent'
import AuthContext from '../../store/auth-context'
import videosPath from '../../assets/videoPaths'
import { useSigns } from '../../utils/http'
const StartingPageContent = () => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const {data:videos, error, loading} = useSigns()
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    if(!activeVideo && videos) {
      setActiveVideo(videos[0])
    }
  }, [videos])

  if(loading || !videos || !activeVideo) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Col style={{ textAlign: 'center' }}>
        <h1>Welcome to Signs!</h1>
      </Col>
      <Container className='card'>
        <br />
        <Row>
          <Col lg={4}>
            <Card style={{ padding: 0 }}>
              <Card.Header>Signs</Card.Header>
              <div style={{ objectFit: 'fill', overflowY: 'scroll', height: '650px' }}>
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
            <VideoComponent key={activeVideo.name} videoUrl={activeVideo.videoUrl} name={activeVideo.name}></VideoComponent>
          </Col>

          <Col lg={4}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{activeVideo.name}</Card.Title>
                <Card.Text>Video path: {activeVideo.videoUrl}</Card.Text>
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
