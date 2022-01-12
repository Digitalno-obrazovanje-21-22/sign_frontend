import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { useSigns, usePercentages } from '../utils/http'
import { useEffect, useState } from 'react'

export const ProfilePage = () => {
    const { data: videos, error, loading } = useSigns()
    const [activeVideo, setActiveVideo] = useState(null)
    const [myVideos, setMyVideos] = useState([])
    //TODO: remove hardcoded userId and use one from localStorage
    const { data: percentages } = usePercentages(1)
    const [activePercentage, setActivePercentage] = useState(null)

    useEffect(() => {
        if (percentages) {
            percentages.filter(percentage => {
                if (percentage.signId == activeVideo.id) {
                    setActivePercentage(percentage.percentage)
                }
            });
        }
    }, [percentages])

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

    const handleSettingActiveVideo = (video) => {
        setActiveVideo(video);
        percentages.filter(percentage => {
            if (percentage.signId == video.id) {
                setActivePercentage(percentage.percentage)
            }
        });
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
                                        <div key={video.url} onClick={() => handleSettingActiveVideo(video)}>
                                            <ListGroup.Item active={video === activeVideo}>{video.name}</ListGroup.Item>
                                        </div>
                                    ))}
                                </ListGroup>
                            </div>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Row>
                            <h5>The Percentage of correct guesses for the sign:</h5>
                        </Row>
                        <Row style={{ textAlign: "center" }}>
                            <Col>{activePercentage}</Col>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{activeVideo.name}</Card.Title>
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