import React from 'react'
import { MessageBox,Input } from "react-chat-elements" 
import { useCallback, useEffect, useState } from "react"
import { useSocket } from "../context/SocketContext"
import "../Style/chat.style.css"
import { IoMdSend  } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useRoom } from "../context/RoomContext";
// import useChatScroll from "../hooks/useChatScroll";
// import { useRoom } from "../context/RoomContext";
function Chat() {
  let [chatArray,setChatArray]=useState([])
  // const ref = useChatScroll(chatArray)
  const socket = useSocket()
  const [msg,setMsg] = useState("")
  const {name,setName,roomId,mySocketId,setMySocketId} = useRoom()
  const chatRef = React.useRef(null);
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when chatArray updates
  }, [chatArray]);
  // handle Send Message
  const handleSendMessage = useCallback((e)=>{
    e.preventDefault()
    let time = new Date()
    socket.emit("chat:outgoing",{name,time,msg,roomId,mySocketId})
    
    // let x = (<MessageBox
    //   position='right'
    //   title={name}
    //   type='text'
    //   text={msg}
    //   date={time}
      
    // />)
    setMsg("")
    // console.log(e.target,msg)
    // e.target.value=""
    
    // setChatArray([...chatArray,x])
    
  },[msg, mySocketId, name, roomId, socket])


  // handle incoming Messages
  const handleIncomingMessages = useCallback((data)=>{
    console.log(data.name ? data.name:name)
    let newMsg = (<MessageBox
      position={data.mySocketId==mySocketId?"right":"left"}
      title={data.name}
      type='text'
      text={data.msg}
      date={data.time}
    
    />)
    // setMsg("")
    // console.log(e.target,msg)
    // e.target.value=""
    
    setChatArray((prevChatArray) => [...prevChatArray, newMsg]);
  },[mySocketId, name])

  const handleRoomJoin = useCallback((data)=>{
    // console.log(data);
    let landing = (<div className="landing">
      <CgProfile />
      {data.name} landed in this lobby
      </div>)
    setChatArray((prevChatArray) => [...prevChatArray, landing]);
  },[])
 

  useEffect(()=>{
    socket.on("join:room",handleRoomJoin)
    socket.on("chat:incoming",handleIncomingMessages)

    return ()=>{
      socket.off("join:room",handleRoomJoin)
      socket.off("chat:incoming",handleIncomingMessages)
    }
  },[handleIncomingMessages, handleRoomJoin, socket])
  return (
    <div className='chat'>
       <div className="chatItems" ref={chatRef} >
       {/* <MessageBox
  position='left'
  title='Burhan'
  type='text'
  text="Hi there !"
  date={new Date()}
  replyButton={true}
/>

<MessageBox
  position="right"
  title="Emre"
  type="meetingLink"
  text="Click to join the meeting"
  date={new Date()}
/> */}

{
  chatArray.length>0 && chatArray.map(x=>x)
}


       </div>
       <form action="" onSubmit={handleSendMessage}>
       <div className="chatInput">
          
          <input
  placeholder="Type here..." required
  className="chatInp" value={msg} onChange={(e)=>{setMsg(e.target.value)}}
/>
<button type="submit" className="button-6"><IoMdSend /></button>
          
       </div>
       </form>

    </div>
  )
}

export default Chat 
