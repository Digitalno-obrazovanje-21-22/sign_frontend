import { Table } from 'react-bootstrap'

const Leaderboard = ({ users }) => {
  return (
    <div className='row'>
      <div className='col'>
        <div className='card'>
          <div className='card-body'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Username</th>
                  <th scope='col'>Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={Math.random()}>
                    <td>{i}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
        </div>
      </div>
    </div> 
  )
}
export default Leaderboard
