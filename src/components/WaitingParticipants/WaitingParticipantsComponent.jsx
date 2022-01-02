import { useEffect, useState } from "react";
import { baseUrl, urls } from "../../utils/baseUrls";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router";

const WaitingParticipantsComponent = () => {
    // const roomCtx = useContext(RoomContext)

    // roomCtx.addToRoom(localStorage.getItem('roomId'))
    const roomId = localStorage.getItem('chosenRoomId')
    
    const [users, setUsers] = useState([]);
    const [myInterval, setMyInterval] = useState()
    const { id } = useParams()
    const getUsers = () => {
    axios.get(baseUrl + urls.roomParticipantUrl + "/" + id)
        .then((response) => {
            const myUser = response.data;
            setUsers(myUser);
            console.log(roomId);
            console.log(myUser);
        })
    }
    
    useEffect(() => {
        setMyInterval(setInterval(() => {
            getUsers()
        }, 2000))
        return () => {
            clearInterval(myInterval)
        }
    },[]);

    return(
      <Table variant="dark" striped bordered hover style={{width:"30em"}} responsive="true">
          <thead>
              <tr>
                  <th>Name</th>
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