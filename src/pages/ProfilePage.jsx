import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useSigns } from '../utils/http'
import { useEffect, useState } from 'react'

export const ProfilePage = () => {
    const { data: videos, error, loading } = useSigns()
    const [activeVideo, setActiveVideo] = useState(null)
    const [myVideos, setMyVideos] = useState([])

    useEffect(() => {
        if (!activeVideo && videos) {
            const temp = videos.map(val => ({ ...val, difficulty: val.stats.length ? Math.floor((val.stats.reduce((acc, val) => acc + val.correct, 0) / val.stats.length) * 3) : -1 }))
            setMyVideos(temp)
            setActiveVideo(temp[0])
        }
    }, [videos])

    if (loading || !videos || !activeVideo) {
        return <div>loading...</div>
    }

    const user = {
        id: localStorage.getItem("userId"),
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
    }

    const difficulty = ['red', 'yellow', 'green']
    const getDifficulty = (val) => {
        if (val == -1) return 'blue'
        if (val == 3) return 'green'
        return difficulty[val]
    }

    return (
        <div style={{ textAlign: "center" }}>

            <Container className='card' style={{ marginLeft: "15em", marginRight: "3em", marginTop: "3em" }}>
                <Row style={{ textAlign: "left" }}>
                    <Col md={4}>
                        <Row>
                            <Col><label>Username:</label> {user.firstName + " " + user.lastName}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <label>Score:</label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
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
                    <Col lg={4}>
                        
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
                            <Card.Body style={{ display: 'flex' }}>
                                <Card.Title>Difficulty</Card.Title>
                                <Card.Text style={{ marginLeft: 20, width: 20, height: 26, backgroundColor: getDifficulty(activeVideo.difficulty) }}></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}