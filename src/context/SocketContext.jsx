import React,{createContext,useMemo,useContext} from "react"
import {io} from "socket.io-client"
// import RoomProvider from "./RoomContext"
export const SocketContext = createContext(null)
export const useSocket = ()=>{
    const socket = useContext(SocketContext)
    return socket
}

export const SocketProvider = (props)=>{
    // const url = "0z9dc935-8000.inc1.devtunnels.ms"
    const url = null
    const socket = useMemo(()=>io(url ||'localhost:8000'),[])
    return(
        // <RoomProvider>
        <SocketContext.Provider value={socket}> 
            {props.children}
        </SocketContext.Provider>
        // </RoomProvider>
    )
}