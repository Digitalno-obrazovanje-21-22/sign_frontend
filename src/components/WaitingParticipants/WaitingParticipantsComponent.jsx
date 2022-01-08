import { useEffect, useState } from 'react'
import { baseUrl, urls } from '../../utils/baseUrls'
import axios from 'axios'
import { useParams } from 'react-router'

const WaitingParticipantsComponent = () => {
  const [users, setUsers] = useState([])
  const [myInterval, setMyInterval] = useState()
  const { id } = useParams()
  const getUsers = () => {
    axios.get(baseUrl + urls.roomParticipantUrl + '/' + id).then((response) => {
      const myUser = response.data
      setUsers(myUser)
    })
  }

  useEffect(() => {
    setMyInterval(
      setInterval(() => {
        getUsers()
      }, 2000),
    )
    return () => {
      clearInterval(myInterval)
    }
  }, [])

  return (
    <div class='row'>
      <div class='col'>
        <div class='card'>
          <div class='card-body'>
            <table class='table'>
              <thead>
                <tr>
                  <th scope='col'>First name</th>
                  <th scope='col'>Last name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <tr key={Math.random()}>
                      <td>{user.user.firstName}</td>
                      <td>{user.user.lastName}</td>
                      <td>{user.user.email}</td>
                      <td>{user.user.score}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingParticipantsComponent
