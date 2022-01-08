import React from 'react'
import Leaderboard from '../components/Leaderboard/Leaderboard'
import { Container, Row} from 'react-bootstrap'
import { baseUrl, urls } from '../utils/baseUrls'
import axiosInstance from '../axiosInstance/axiosInstance'
import './../components/Leaderboard/Leaderboard.css'
class LeaderboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      users: [],
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    axiosInstance.get(baseUrl + urls.userUrl).then((response) => {
      const data = response.data
      this.setState({ users: data })
    })
  }

  render() {
    return (
      <div
        style={{
          paddingTop: "20px",
        }}
      >
        <Row>
          <div>
            <div style={{ textAlign: 'center' }}>
              <h2>Leaderboard</h2>
            </div>
          </div>
        </Row>
        <Container>
          <Leaderboard users={this.state.users}></Leaderboard>
        </Container>
      </div>
    )
  }
}

export default LeaderboardPage
