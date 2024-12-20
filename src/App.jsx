import "./Style/index.css"
import "react-chat-elements/dist/main.css"
import Index from './components/Index';
import { Routes,Route } from 'react-router-dom';
import Create from "./components/Create"
import Join from './components/Join'; 
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // If supporting IE11

// import { useState } from "react";

import Lobby from './components/Lobby';
// import { useEffect } from "react";

function App() {
  // const [socket,setSocket] = useState(null)
  // useEffect(()=>{
    
    // setSocket(sock)
  // },[])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Index />}/>
        <Route path='/create' element={<Create  />}/>
        <Route path='/join' element={<Join />}/>
        <Route path='/lobby/:roomId' element={<Lobby />}/>
      </Routes>
    </div>
  );
}

export default App;
