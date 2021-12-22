import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import AuthContext from "../store/auth-context"
import { useRoomParticipants } from "../utils/http"
import io from "socket.io-client";
import { Spinner } from "react-bootstrap";
import { Record } from "../components/Record";
import GuessingComponent from "../components/GuessingSign/GuessingComponent";
import { OthersGuessing } from "../components/OthersGuessing.";

export const PlayPage = () => {
  const [socket, setSocket] = useState(null)
  const [playStep, setPlayStep] = useState(null)
  const { id } = useParams()
  const history = useHistory()
  const authCtx = useContext(AuthContext)

  const { data, error, loading } = useRoomParticipants(id)

  useEffect(() => {
    if(!!authCtx) {
      const socketConnection = io.connect("http://localhost:3001");

      socketConnection.emit("playGame", {token: authCtx.token, roomId: id})

      socketConnection.on("setStep", (step)=> {
        if(step.guessing && step.token == authCtx.token) {
          setPlayStep({...playStep, othersGuessing: true})
        } else {
          setPlayStep(step)
        }
      })
      socketConnection.on("nextPlayer", index => {
        socketConnection.emit("playGame", {token: authCtx.token, roomId: id, index})
      })

      setSocket(socketConnection)
    }
  }, [authCtx])

  if(loading || !data || !playStep) {
    return <Spinner/>
  }

  if(!!error) {
    return <div>Error</div>
  }

  return (
    <div>
      {playStep.othersGuessing && <OthersGuessing socket={socket} roomId={id} token={authCtx.token}/>}
      {playStep.recording && !playStep.othersGuessing && <Record socket={socket}/>}
      {playStep.waiting && <div>{`waiting for ${playStep.user.firstName} ${playStep.user.lastName} to record`}</div>}
      {playStep.guessing && <GuessingComponent sign={playStep.sign} videoUrl={playStep.guess} socket={socket} sign={playStep.sign}/>}
    </div>
  )
}