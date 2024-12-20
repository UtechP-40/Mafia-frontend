/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import "../Style/Join.css";
import { useSocket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { useRoom } from "../context/RoomContext";

function Join() {
  const socket = useSocket();
  const navigate = useNavigate();

  const { mySocketId, setMySocketId, roomId, setRoomId ,name, setName} = useRoom();

  // const [] = useState("");

  // Handle form submission
  const handleJoinSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Validation for empty fields
      if (!name.trim() || !roomId.trim()) {
        alert("Please fill in both Name and Room ID.");
        return;
      }

      // Emit join event
      socket.emit("join:room", { roomId, name });
    },
    [name, roomId, socket]
  );

  // Handle socket response for room join
  const handleRoomJoin = useCallback(
    (data) => {
      if (data.success) {
        setMySocketId(data.socketID);
        setRoomId(data.roomId);
        setName(data.name)
        alert(`You joined as ${data.role}`); // Notify user of their role
        navigate(`/lobby/${data.roomId}`);
      } else {
        alert(data.message || "Failed to join the room."); // Show error if join fails
      }
    },
    [navigate, setMySocketId, setRoomId]
  );

  // Attach and cleanup socket listeners
  useEffect(() => {
    socket.on("join:room", handleRoomJoin);

    return () => {
      socket.off("join:room", handleRoomJoin);
    };
  }, [socket, handleRoomJoin]);

  return (
    <div>
      <form className="login-form" onSubmit={handleJoinSubmit} action="#">
        <div className="form-title josefin-sans-bold">Welcome</div>
        <div className="custom-input josefin-sans-regular">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
          />
        </div>
        <div className="custom-input josefin-sans-regular">
          <label>Room ID</label>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder=""
          />
        </div>
        <button type="submit" className="josefin-sans-semi-bold">
          JOIN
        </button>
      </form>
    </div>
  );
}

export default Join;
