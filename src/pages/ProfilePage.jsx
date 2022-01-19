import { Container, Row, Col, Card, ListGroup, Stack } from 'react-bootstrap'
import { useSigns, usePercentages } from '../utils/http'
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import Loader from '../components/LoaderClip/Loader'

export const ProfilePage = () => {
  const { data: videos, error, loading } = useSigns()
  const [activeVideo, setActiveVideo] = useState(null)
  const [myVideos, setMyVideos] = useState([])
  const { data: percentages } = usePercentages(localStorage.getItem('userId'))
  const [activePercentage, setActivePercentage] = useState(null)

  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'apexchart-example',
    },
    labels: ['Correct', 'Incorrect']
  })
  const [chartSeries, setChartSeries] = useState([50, 50])

  useEffect(() => {
    if (percentages) {
      percentages.filter((percentage) => {
        if (percentage.signId == activeVideo.id) {
          setActivePercentage(percentage.percentage)
        }
      })
    }
  }, [percentages])

  //update chart
  useEffect(() => {
    if (activePercentage && activeVideo) {
      setChartOptions({
        chart: {
          id: 'apexchart-example',
        },
        labels: ['Correct', 'Incorrect']
      })
      setChartSeries([parseFloat(activePercentage), 100-parseFloat(activePercentage)])
    }
  }, [activePercentage, activeVideo])
  const calculateDifficulty = (diff) => {
    if (diff > 0 && diff < 0.1) {
      return 0
    }
    if (diff >= 0.1 && diff < 0.2) {
      return 1
    }
    if (diff >= 0.2 && diff < 0.9) {
      return 2
    }
  }
  useEffect(() => {
    if (!activeVideo && videos) {
      const temp = videos.map((val) => ({
        ...val,
        dif: val.stats.reduce((acc, val) => acc + val.correct, 0) / val.stats.length,
        //difficulty: val.stats.length ? Math.floor((val.stats.reduce((acc, val) => acc + val.correct, 0) / val.stats.length) * 3) : -1,
        difficulty: val.stats.length ? calculateDifficulty(val.stats.reduce((acc, val) => acc + val.correct, 0) / val.stats.length) : -1,
      }))
      console.log(temp)
      setMyVideos(temp)
      setActiveVideo(temp[0])
    }
  }, [videos])

  if (loading || !videos || !activeVideo) {
    //return <div>loading...</div>
    return <div style={{ marginTop: "20%" }}> <Loader /> </div>
  }

  const user = {
    id: localStorage.getItem('userId'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
  }

  const difficulty = ['red', 'yellow', 'green', 'blue']
  const getDifficulty = () => {
    const perc = parseInt(activePercentage) / 100
    let val = null

    if (perc > 0 && perc < 0.1) {
      val = 0
    } else if (perc >= 0.1 && perc < 0.2) {
      val = 1
    } else if (perc >= 0.2 && perc < 1) {
      val = 2
    } else {
      val = 4
    }

    return difficulty[val]
  }

  const handleSettingActiveVideo = (video) => {
    setActiveVideo(video)
    percentages.filter((percentage) => {
      if (percentage.signId == video.id) {
        setActivePercentage(percentage.percentage)
      }
    })
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Container className='card' style={{ marginLeft: '10em', marginRight: '3em', marginTop: '3em' }}>
        <Row style={{ textAlign: 'left' }}>
          <Col md={4}>
            <Row>
              <Col>
                <label>Username:</label> {user.firstName + ' ' + user.lastName}
              </Col>
            </Row>
            {/*<Row>
              <Col>
                <label>Score:</label>
              </Col>
            </Row>*/}
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={4}>
            <Card style={{ padding: 0, cursor:"pointer" }}>
              <Card.Header><b>Signs</b></Card.Header>
              <Card.Body></Card.Body>
              <div style={{ marginLeft: "1em", marginRight: "1em" }}>
                <ListGroup >
                  <Row>
                    {myVideos.map((video, index) => (
                      <div key={video.url} className="col-sm-4" style={{ marginBottom: '1em', height: "100px" }} onClick={() => handleSettingActiveVideo(video)}>
                        <div className='card' style={{ textAlign: "center", height: '100%', backgroundColor: video === activeVideo ? 'rgb(0,123,255)' : 'rgb(13,110,253,0.05)' }} action active={video === activeVideo}>{video.name}</div>
                      </div>
                    ))}
                  </Row>
                </ListGroup>
              </div>
            </Card>
            
          </Col>
          <Col>
            {activePercentage && (
              <Stack direction='horizontal' gap={2}>
                <Col>
                  <Row>
                    <h5>The Percentage of correct guesses for the sign:</h5>
                  </Row>
                  <Row style={{ textAlign: 'center' }}>
                    <Col>{activePercentage} %</Col>
                  </Row>
                  <br />      
                  <br/>
                  <br/>
                  <br/>
                  <Row>{activePercentage ? <Chart options={chartOptions} series={chartSeries} type='pie' width={450} height={630} /> : null}</Row>
                </Col>
                <Col>
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
              </Stack>
            )}
            {!activePercentage && (
              <div style={{ marginTop: '25%' }}>
                <Loader />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
