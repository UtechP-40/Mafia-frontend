import { useContext,createContext,useState } from "react";

const RoomContext = createContext()

export const useRoom = ()=>{
    const room = useContext(RoomContext)
    return room
}

const RoomProvider = (props)=>{
    const [roomId,setRoomId] = useState(null)
    const [name,setName] = useState("")
    const [mySocketId,setMySocketId] = useState("")
    const [stream, setStream] = useState(null);
    return(
        <RoomContext.Provider value={{roomId,setRoomId,name,setName,mySocketId,setMySocketId,stream, setStream}}>
            {props.children}
        </RoomContext.Provider>
    )
}
export default RoomProvider