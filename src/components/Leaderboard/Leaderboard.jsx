import { render } from "@testing-library/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {Table} from "react-bootstrap";
import { baseUrl, urls } from "../../utils/baseUrls";

const Leaderboard = () => {

    const [users, setUsers] = useState([
        {
            name:"User1", score: 250
        },
        {
            name:"User2", score: 230
        },
        {
            name:"User5", score: 100
        }
    ]);

    useEffect(() => getUsers(), []);

    const getUsers = () => {
        axios.get(baseUrl + "/" + urls.userUrl).then((response) => {
            console.log(response);
            const data = response.data;
            setUsers(data);
        })
    }

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
                        <td>{user.name}</td>
                        <td>{user.score}</td>
                    </tr>
            )})}
        
        </tbody>
       
        </Table>
)
}

export default Leaderboard;