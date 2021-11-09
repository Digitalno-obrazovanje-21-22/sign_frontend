import { Image } from 'react-bootstrap'
import classes from './StartingPageContent.module.css'
import { Col, Container, Row } from "react-bootstrap";
import { useState } from 'react';
import VideoComponent from '../Video/VideoComponent';

const StartingPageContent = ({ user }) => {

  const [videos, setVideos] = useState([{
    url:"https://media.spreadthesign.com/video/mp4/13/109898.mp4",
    name: "Dobar dan" 
  },{
    url:"https://media.spreadthesign.com/video/mp4/13/109919.mp4",
    name: "Bok"
  },
  {
    url:"https://media.spreadthesign.com/video/mp4/13/456604.mp4",
    name: "Kako si?"
  },
  {
    url: "https://media.spreadthesign.com/video/mp4/13/49162.mp4",
    name: "Okej"
  },
  {
    url:"https://media.spreadthesign.com/video/mp4/13/153329.mp4",
    name: "Dobro"
  }
]);


  return (
    <div>
      <Col style={{ textAlign: "center" }}> <h1>Welcome to Signs!</h1></Col>
      <Container>
        <div>
          <b>Username: </b>
          <text>{user.name}</text><br />
          <b>Score: </b>
          <text>{user.score}</text>
        </div>
        <br/>
        <Row>
          {videos.map((video, i) => {
            return (
              <VideoComponent videoUrl={video.url} name={video.name}></VideoComponent>
            )
          })
          }
        </Row>
      </Container>
    </div>

  )
}

export default StartingPageContent
