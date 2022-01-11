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
  const [myVideos, setMyVideos] = useState([])

  useEffect(() => {
    if(!activeVideo && videos) {
      const temp = videos.map(val => ({...val, difficulty: val.stats.length ? Math.floor((val.stats.reduce((acc, val) => acc+val.correct, 0)/val.stats.length)*3) : -1}))
      setMyVideos(temp)
      setActiveVideo(temp[0])
    }
  }, [videos])

  if(loading || !videos || !activeVideo) {
    return <div>loading...</div>
  }

  const difficulty = ['red', 'yellow', 'green']
  const getDifficulty =(val) => {
    if(val == -1) return 'blue'
    if(val == 3) return 'green'
    return difficulty[val]  
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
                  {myVideos.map((video) => (
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
              <Card.Body style= {{display: 'flex' }}>
                <Card.Title>Difficulty</Card.Title>
                <Card.Text style={{marginLeft: 20,width: 20, height: 26, backgroundColor: getDifficulty(activeVideo.difficulty)}}></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StartingPageContent
