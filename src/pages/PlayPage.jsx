import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import AuthContext from "../store/auth-context"
import { useRoomParticipants } from "../utils/http"
import io from "socket.io-client";
import { Spinner } from "react-bootstrap";
import { Record } from "../components/Record";
import GuessingComponent from "../components/GuessingSign/GuessingComponent";
import { OthersGuessing } from "../components/OthersGuessing.";
import { GameEndComponent } from "../components/GameEnd/GameEndComponent";
import WaitingWhileOneRecords from "../components/WaitingParticipants/WaitingWhileOneRecords";

export const PlayPage = () => {
  const [socket, setSocket] = useState(null)
  const [playStep, setPlayStep] = useState(null)
  const { id } = useParams()
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
      socketConnection.on("endRound", leader => {
        setPlayStep({endGame: leader})
      })
      socketConnection.on("endGame", () => {
        setPlayStep({endGame: -1})
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
      {playStep.waiting && <WaitingWhileOneRecords firstName={playStep.user.firstName} lastName={playStep.user.lastName} /> }
      {playStep.guessing && <GuessingComponent sign={playStep.sign} videoUrl={playStep.guess} socket={socket} sign={playStep.sign} token={authCtx.token} roomId={id}/>}
      {playStep.endGame && <GameEndComponent socket={socket} roomId={id} leader={playStep.endGame} token={authCtx.token}/>}
    </div>
  )
}
