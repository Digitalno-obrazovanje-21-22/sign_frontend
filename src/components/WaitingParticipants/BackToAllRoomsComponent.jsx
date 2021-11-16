import {Button} from 'react-bootstrap'
import axios from "axios"
import { useContext, useEffect } from "react"
import AuthContext from "../../store/auth-context"
import RoomContext from "../../store/room-context"
import { baseUrl, urls } from "../../utils/baseUrls"

const BackToAllRoomsComponent = () => {
    const authCtx = useContext(AuthContext)
    const roomCtx = useContext(RoomContext)

    const roomId = roomCtx.roomId
    console.log(roomCtx.apartOfTheGame)
    


    const removeUser = () => {
        axios.post(baseUrl + urls.roomParticipantUrl + "/" + roomId)
        .then((response) => {
            console.log(response)
        } )
    }

    useEffect(() => removeUser(), []);

    return(
        <Button size="md" style={{float:"right"}} onClick={() => roomCtx.removeFromRoom()} href="/choosing-room">Return</Button>
    )
}

export default BackToAllRoomsComponent;