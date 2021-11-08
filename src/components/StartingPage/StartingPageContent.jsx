import { Image } from 'react-bootstrap'
import classes from './StartingPageContent.module.css'
import {Col, Container} from "react-bootstrap";

const StartingPageContent = ({user}) => {

  return (
    <div>
      <Col style={{textAlign:"center"}}> <h1>Welcome to Signs!</h1></Col>
       <Container>
        <div>
          <b>Username: </b>
          <text>{user.name}</text><br />
          <b>Score: </b>
          <text>{user.score}</text>
        </div>
       </Container>
    </div>

  )
}

export default StartingPageContent
