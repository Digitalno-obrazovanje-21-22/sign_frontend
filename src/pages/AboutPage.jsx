
import React from 'react'
import { Button, Card, Col, Container, Dropdown, ListGroup, Nav, Row, Tab } from 'react-bootstrap'

class AboutPage extends React.Component {
  render() {
    return <div >
      <Col style={{ textAlign: 'center' }}>
        <h2>About application</h2>
      </Col>
      <Container className='card' style={{ width: "70%" }} >
        <br />
        <Row>
          <Col style={{marginLeft:"1em", marginRight:"1em"}}>
            <div>
              <p><h4 style={{color: "rgb(7, 44, 97, 0.7)"}}>Application description</h4>
                The Signs application is used for learning American Sign Language (ASL) in a fun and interactive way. ASL is a natural language that serves as the predominant sign language of hearing-impaired communities in the United States and most of Canada. The main goal of the app is to introduce users to the basic phrases (or signs) used in the sign language through videos and a game of guessing signs. Users learn the signs themselves and then properly show these using ASL to the other users. The application is intended for all those who want to learn the basics of sing language and use it to communicate with others.

                The game is started by one of the players, while the others are waiting. The first player needs to record a video of the assigned sign using ASL and then send it to other players. Other players guess the sign and earn points in doing so. Users track their performance and progress via a leaderboard.

              </p>
              <p>
                <h4 style={{color: "rgb(7, 44, 97, 0.7)"}}>Theoretical background</h4>
                The application is based on the principles of collaborative learning, in which two or more people learn or attempt to learn something together [1]. Collaborative learning is done in groups, communities and societies, and very often involves problem-solving and learning through play. Due to the rapid development of technology, the combination of collaborative and online learning is becoming common, and ofter implemented through computers. Therefore, various applications for quick and easy collaborative learning are being developed across different fields.
                Learning analytics is the collection, measurement and analysis of data about students and their learning context, in order to optimize learning and the environment in which it occurs [2]. Learning analytics support the development of learning strategies important skills such as critical thinking, collaboration, communication and creativity [2]. Likewise, personalized feedback allows students to develop an awareness of their own knowledge and progres sin learning. Consequently, more and more learning applications today use collaborative learning techniques along with learning analytics to support learners.

                <br /><br />
                [1]P. Dillenbourg, “What do you mean by collaborative learning? What do you mean by ‘collaborative learning’?”<br />
                [2]“What is Learning Analytics? - Society for Learning Analytics Research (SoLAR).” [Online]. Available: <a href="https://www.solaresearch.org/about/what-is-learning-analytics/">https://www.solaresearch.org/about/what-is-learning-analytics/</a>.

              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  }
}

export default AboutPage
