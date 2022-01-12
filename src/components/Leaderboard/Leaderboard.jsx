const Leaderboard = ({ users }) => {
  return (
    <div style={{justifyContent:"center", display:"flex"}}>
      <div className='row' style={{ width: "65%", textAlign: "center" }}>
        <div className='col'>
          <div className='card'>
            <div className='card-body'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Rank</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const totalScore = user.roomParticipants.reduce((acc, val) => acc + val.score, 0)
                    return { ...user, totalScore }
                  }).sort((a, b) => b.totalScore - a.totalScore).map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>{user.totalScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Leaderboard
