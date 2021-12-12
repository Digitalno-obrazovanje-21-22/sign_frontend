import {Button} from 'react-bootstrap'
import axios from "axios"
import { useContext, useEffect } from "react"
import AuthContext from "../../store/auth-context"
import RoomContext from "../../store/room-context"
import { baseUrl, urls } from "../../utils/baseUrls"

const BackToAllRoomsComponent = () => {
    const authCtx = useContext(AuthContext)
    const roomCtx = useContext(RoomContext)

    const roomId = localStorage.getItem('chosenRoomId')
    


    const removeUser = () => {
        // axios.post(baseUrl + urls.roomParticipantUrl + '/' + roomId).then((response) => {
        //   console.log(response)
        // })
        console.log("ovdje je bio post?")
    }

    useEffect(() => removeUser(), []);

    return(
        <Button size="md" style={{float:"right", backgroundColor:"#0099cc", width:"8em"}} onClick={() => roomCtx.removeFromRoom()} href="/choosing-room">Return</Button>
    )
}

export default BackToAllRoomsComponent;
