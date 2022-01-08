import { Col, Row } from 'react-bootstrap'

const VideoComponent = ({ videoUrl, name }) => {
  console.log(window.location.origin + videoUrl)
  return (
    <>
      <div style={{ objectFit: 'fill' }}>
        <video controls title={name} height='700' width='400' loop>
          <source src={window.location.origin + videoUrl + '.mp4'} type='video/mp4' title={name} />
        </video>
      </div>
    </>
  )
}

export default VideoComponent
