import React, { useCallback, useEffect, useState } from 'react'
import  "../Style/Join.css"
import { useSocket } from '../context/SocketContext'
import { useRoom } from '../context/RoomContext'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
function Create() {
  const socket = useSocket()
  const [isLoading, setIsLoading] = useState(false);
  const {roomId,setRoomId,name,setName} = useRoom()
  const [nPlayers,setNPlayers] = useState(6)
  // const [name,setName] = useState("")
  const navigate = useNavigate()
// Form event handlers
const handleCreateSubmit = useCallback((e) => {
  e.preventDefault();
  if (!name.trim()) {
    alert("Name cannot be empty!");
    return;
  }
  setIsLoading(true);
  socket.emit("create:room", { nPlayers, name });
}, [nPlayers, name, socket]);

  const handleMinus = useCallback(()=>{
    if(nPlayers>6){
      setNPlayers(6)
    }
  },[nPlayers])
  const handlePlus = useCallback(()=>{
    if(nPlayers<9){
      setNPlayers(9)
    }
  },[nPlayers])
// Socket handler Function

const handleCreateRoom = useCallback((data) => {
  if (data.success) {
    console.log(data);
    setRoomId(data.roomID);
    navigate(`/lobby/${data.roomID}`);
  } else {
    alert(data.message || "Failed to create room.");
  }
}, [navigate, setRoomId]);



  useEffect(()=>{
    socket.on("create:room", (data) => {
      setIsLoading(false);
      handleCreateRoom(data);
    });

    return ()=>{
      socket.off("create:room",handleCreateRoom)
    }
  },[socket,handleCreateRoom])

  return (
    <div>
    <form className="login-form" onSubmit={handleCreateSubmit} action="#">
  <div className="form-title josefin-sans-bold">Welcome</div>
  <div className="custom-input josefin-sans-regular">
      <label style={{paddingLeft:"30px"}}>Name</label>
      <input type="text" style={{paddingLeft:"30px"}} onChange={(e)=>{setName(e.target.value)}} value={name} placeholder=""/>
  </div>
  <div className="custom-input josefin-sans-regular">
      <label style={{paddingLeft:"30px"}}>Number Of Players</label>
      <div style={{display:"flex"}}>
        
        <span style={{border:"4px solid #989898",width:"60px",display:"flex",justifyContent:"center",alignItems:"center",height:"50px"}} onClick={handleMinus}>-</span>

      <input style={{paddingLeft:"30px"}} type="text" value={nPlayers} placeholder="" onChange={(e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 6 && value <= 9) {
      setNPlayers(value);
    }
  }} />

      <span onClick={handlePlus} style={{border:"4px solid #989898",width:"60px",display:"flex",justifyContent:"center",alignItems:"center",height:"50px"}}>+</span>
      
      </div>
      <div style={{marginTop:"20px",paddingLeft:"3   0px"}} className='roomID'>
        {/* {roomId && (
          <h2>{roomId}</h2>
        )} */}
      </div>
  </div>
  <button type="submit" className="josefin-sans-semi-bold" disabled={isLoading}>
  {isLoading ? "Creating..." : "Create"}
</button>
</form>
  </div>
  )
}

export default Create
