import './App.css';
import { useState } from 'react';
import io from 'socket.io-client'
import Chats from './Chats';
import Editor from './Editor';
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const joinRoom=()=>{
    if(username !=="" && room !==""){
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return(
   <div className='App'>
   {!showChat? (
   <div className='joinChatContainer'>
    <h3>Join A Chat</h3>
    <input type='text' placeholder='Your Name...' onChange={(event)=>{
      setUsername(event.target.value)
    }}></input>
    <input type='text' placeholder='Room ID...' onChange={(event)=>{
      setRoom(event.target.value)
    }}></input>
    <button onClick={joinRoom}>Join a Room</button>
    </div>)
    :
   ( <Chats socket={socket} username={username} room={room}/>)
   }

   </div>
  );
}

export default App;
