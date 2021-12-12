import { useContext, useEffect, useState } from "react";
import { baseUrl, urls } from "../../utils/baseUrls";
import AuthContext from "../../store/auth-context";
import { Table } from "react-bootstrap";
import axios from "axios";
import RoomContext from "../../store/room-context";

const WaitingParticipantsComponent = () => {
    const authCtx = useContext(AuthContext)
    // const roomCtx = useContext(RoomContext)

    // roomCtx.addToRoom(localStorage.getItem('roomId'))
    const roomId = localStorage.getItem('chosenRoomId')
    
    const [users, setUsers] = useState([]);
    const getUsers = () => {
    axios.get(baseUrl + urls.roomParticipantUrl + "/" + roomId)
        .then((response) => {
            console.log(response);
            const myUser = response.data;
            setUsers(myUser);
            console.log(roomId);
            console.log(myUser);
        })
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getUsers(),[]);

    return(
      <Table variant="dark" striped bordered hover style={{width:"30em"}} responsive="true">
          <thead>
              <tr>
                  <th>Username</th>
              </tr>
          </thead>
          <tbody>
              {users.map((user, i ) => {
                  return(
                    <tr>
                        <td> {user.user.firstName}  {user.user.lastName} </td>
                    </tr>
                  )
              })}
          </tbody>
      </Table>
    )
    
}

export default WaitingParticipantsComponent;