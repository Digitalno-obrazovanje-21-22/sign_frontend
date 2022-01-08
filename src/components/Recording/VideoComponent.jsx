import { Col, Row } from 'react-bootstrap'

const VideoComponent = ({ videoUrl, name }) => {
  console.log(window.location.origin + videoUrl)
  return (
    <>
      <Row>
        <div style={{ objectFit: 'fill' }}>
          <video autoPlay controls title={name} height='700' width='400' loop>
            <source src={window.location.origin + videoUrl + '.mp4'} type='video/mp4' title={name} />
          </video>
        </div>
        {/* <img height='160' width='90' src={videoUrl} alt='loading...' /> */}
      </Row>
    </>
  )
}

export default VideoComponent
