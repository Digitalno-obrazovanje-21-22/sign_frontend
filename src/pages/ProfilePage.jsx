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
    xaxis: {
      categories: ['Sign'],
    },
    yaxis: {
      min: 0,
      max: 100,
    },
  })
  const [chartSeries, setChartSeries] = useState([
    {
      name: 'sign1',
      data: [50],
    },
  ])

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
        xaxis: {
          categories: [activeVideo.name],
        },
      })
      setChartSeries([
        {
          name: activeVideo.name,
          data: [activePercentage],
        },
      ])
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
    return <div style={{marginTop:"20%"}}> <Loader /> </div>
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
              {/* <div style={{ objectFit: 'fill', overflowY: 'scroll', height: '650px' }}>
                <ListGroup>
                  {myVideos.map((video) => (
                    <div key={video.url} onClick={() => handleSettingActiveVideo(video)}>
                      <ListGroup.Item active={video === activeVideo}>{video.name}</ListGroup.Item>
                    </div>
                  ))}
                </ListGroup>
              </div> */}
              <div style={{ overflowY: 'scroll', height: '650px' }}>
                <ListGroup>
                  <Row>
                    {myVideos.map((video) => (
                      <div key={video.url} className='col-sm-4' style={{ marginBottom: '9px', justifyContent: 'flex' }} onClick={() => handleSettingActiveVideo(video)}>
                        <ListGroup.Item
                          className='card'
                          style={{
                            height: '100%',
                            padding: '5px',
                            justifyContent: 'center',
                            backgroundColor: video === activeVideo ? 'rgb(0,123,255)' : 'rgb(13,110,253,0.05)',
                          }}
                          action
                          active={video === activeVideo}
                        >
                          {video.name}
                        </ListGroup.Item>
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
                  <Row>{activePercentage ? <Chart options={chartOptions} series={chartSeries} type='bar' width={450} height={630} /> : null}</Row>
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
