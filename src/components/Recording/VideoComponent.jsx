import { Col, Row } from 'react-bootstrap'

const VideoComponent = ({ videoUrl, name }) => {
  console.log(window.location.origin + videoUrl)
  return (
    <Col md={4} style={{ textAlign: 'center', PaddingRight: '2em', paddingBottom: '2em' }}>
      <Row>
        <b>{name}</b>
      </Row>
      <Row>
        <video controls height='500' width='1500' title={name}>
          <source src={window.location.origin + videoUrl +'.mp4'} type='video/mp4' title={name} />
        </video>

        {/* <img height='160' width='90' src={videoUrl} alt='loading...' /> */}
      </Row>
    </Col>
  )
}

export default VideoComponent
