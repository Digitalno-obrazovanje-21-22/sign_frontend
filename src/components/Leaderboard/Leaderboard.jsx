import { render } from "@testing-library/react";
import { useState } from "react";
import {Table} from "react-bootstrap";

const Leaderboard = () => {
    const users = [
        {
            name:"User1", score: 250
        },
        {
            name:"User2", score: 230
        },
        {
            name:"User5", score: 100
        }
    ]
    return(
        <Table>
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