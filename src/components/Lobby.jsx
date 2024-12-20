import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import Chat from "./Chat";
import { useRoom } from "../context/RoomContext";
import "../Style/lobby.style.css";

function Lobby() {
    const socket = useSocket();
    const { name, roomId } = useRoom();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.emit("connect:check", { roomId, name });

        // Listen for the room:ready event
        socket.on("room:ready", (data) => {
            setPlayers(data.players);
        });

        return () => {
            // Cleanup the event listener on component unmount
            socket.off("room:ready");
        };
    }, [socket, roomId, name]);

    return (
        <div className="lobCont">
            <div className="nav">
                <h1 style={{ color: "white" }}>Room ID: {roomId}</h1>
            </div>
            <div className="lobbyCont">
                <div className="gameContainer">
                    <div className="mafiaGameCont">
                        {players.map((player, index) => (
                            <div key={index} className="playerBox">
                                {player.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatContainer">
                    <Chat />
                </div>
            </div>
        </div>
    );
}

export default Lobby;
