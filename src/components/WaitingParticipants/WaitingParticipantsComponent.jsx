import { useContext, useEffect, useState } from "react";
import { baseUrl, urls } from "../../utils/baseUrls";
import AuthContext from "../../store/auth-context";
import { Table } from "react-bootstrap";
import axios from "axios";

const WaitingParticipantsComponent = ({roomId}) => {
    const authCtx = useContext(AuthContext)

    const [users, setUsers] = useState([]);
    const getUsers = () => {
    axios.get(baseUrl + urls.roomParticipantUrl + "/" + roomId)
        .then((responce) => {
            console.log(responce);
            const myUser = responce.data;
            setUsers(myUser);
            console.log(roomId);
        })
    }
    
    useEffect(() => getUsers(),[]);

    return(
      <Table variant="dark" striped bordered hover style={{width:"30em"}} responsive="true">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Username</th>
              </tr>
          </thead>
          <tbody>
              {users.map((user, i ) => {
                  return(
                    <tr>
                        <td> {i} </td>
                        <td> {user.userId} </td>
                    </tr>
                  )
              })}
          </tbody>
      </Table>
    )
    
}

export default WaitingParticipantsComponent;