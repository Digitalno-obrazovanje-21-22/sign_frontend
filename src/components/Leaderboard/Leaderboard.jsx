import { Table } from 'react-bootstrap'

const Leaderboard = ({ users }) => {
  return (
    <div class='row'>
      <div class='col'>
        <div class='card'>
          <div class='card-body'>
            <table class='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Username</th>
                  <th scope='col'>Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <tr>
                      <td>{i}</td>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>{user.score}</td>
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
export default Leaderboard
