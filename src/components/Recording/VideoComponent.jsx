import { Col } from "react-bootstrap";

const VideoComponent = ({ videoUrl, name }) => {

    return (
        <Col md={4} style={{textAlign:"center", PaddingRight:"2em", paddingBottom:"2em"}}>
            <b>{name}</b>
            <video controls height="200" width="300" title={name}>
                <source src={videoUrl} type="video/mp4" title={name} />
            </video>
        </Col>
    )
}

export default VideoComponent;
