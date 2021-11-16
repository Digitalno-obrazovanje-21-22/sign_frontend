import React, {useState, useCallback} from "react";

const RoomContext = React.createContext({
    roomId:'',
    apartOfTheGame: false,
    addToRoom: (roomId) => {},
    removeFromRoom: () => {},
})

const retrieveStoredRoom = () => {
    const storedRoomId = localStorage.getItem('roomId')
    return{
        roomId: storedRoomId,
    }
}


export function RoomContextProvider(props) {
    const roomData = retrieveStoredRoom();

    let initialRoom;
    if (roomData) {
        initialRoom = roomData.roomId;
    }

    const [roomId, setRoomId] = useState(initialRoom);

    const userIsInGame = !!roomId;

    const removeFromRoomHandler = useCallback(() => {
        setRoomId(null);
        localStorage.removeItem('roomId');

    }, []);

    const addToRoomHandler = (roomId) => {
        localStorage.setItem('roomId', roomId);
        setRoomId(roomId);
    };

    const contextValue = {
        roomId: roomId,
        apartOfTheGame: userIsInGame,
        addToRoom: addToRoomHandler,
        removeFromRoom: removeFromRoomHandler,
    };

    return <RoomContext.Provider value={contextValue}>{props.children}</RoomContext.Provider>;

}

export default RoomContext;