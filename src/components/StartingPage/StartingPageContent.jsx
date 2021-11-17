import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react'
import { useContext } from 'react'
import VideoComponent from '../Recording/VideoComponent'
import AuthContext from '../../store/auth-context'
import videosPath from '../../assets/videoPaths'
const StartingPageContent = ({ user }) => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const [videos] = useState(videosPath)

  return (
    <div>
      <Col style={{ textAlign: 'center' }}>
        <h1>Welcome to Signs!</h1>
      </Col>
      <Container>
        {isLoggedIn && (
          <>
            <div>
              <b>Username: </b>
              {user.firstName} {user.lastName}
              <br />
              <b>Score: </b>
              {!user.score ? '0' : user.score}
            </div>
          </>
        )}
        <br />

        <Row>
          {videos.map((video, i) => {
            return <VideoComponent key={i} videoUrl={video.url} name={video.name}></VideoComponent>
          })}
        </Row>
      </Container>
    </div>
  )
}

export default StartingPageContent
