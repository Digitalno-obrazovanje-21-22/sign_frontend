
import {Table} from "react-bootstrap";

const Leaderboard = ({users}) => {

    return(
            <Table variant="dark" striped bordered hover style={{width:"30em"}} responsive="true">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => {
                        return (
                            <tr>
                                <td>{i}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.score}</td>
                            </tr>
                    )})}
                
                </tbody>
        
            </Table>
)
}

export default Leaderboard;