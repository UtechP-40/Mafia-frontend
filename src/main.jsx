// import { StrictMode } from 'react'


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SocketProvider } from './context/SocketContext';
import RoomProvider from './context/RoomContext';
import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <RoomProvider>
   <SocketProvider>
     
     <App />
     
    </SocketProvider>
   </RoomProvider>
   </BrowserRouter>
)
// window.global = window;