import React, { useEffect, useRef, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Editor from './Editor';
import EmojiPicker from 'emoji-picker-react';
function Chats({socket, username, room}) {
    const textarea1 = useRef();
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [bold, setBold] = useState('bold');
    const [italic, setItalic] = useState('normal');
    const [decoration, setDecoration] = useState('none');
    const [hlink, setHlink] = useState(false)
    const [bulletpoint, setBullet] = useState(false)
    const [emoji, setEmoji] = useState(false)
    const sendMessage = async()=>{
        if(currentMessage !== ""){
            const messageData = {
                room:room,
                author: username,
                message: [currentMessage, bold, italic, decoration, hlink],
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);
            setMessageList((list)=>[...list, messageData]);
            setCurrentMessage("")
            setBold('normal');
            setItalic('normal');
            setDecoration('none')
            setHlink(false);
            setBullet(false);
        }
    }
    useEffect(()=>{
        socket.on("receive_message", (data)=>{
         setMessageList((list)=>[...list, data])
        })
    }, [socket])
    
    function sendfile(file){
        setCurrentMessage(file.target.value)
    }
 function showemoji(){
    setEmoji((pr)=>!pr)
 }
function emojiadd(obj){
  setCurrentMessage((p)=>p+obj.emoji)
}
  return (
    <div className='chat-window'>
    <div className='chat-header'><p>Live Chat</p></div>
    <div className='chat-body'>
    <ScrollToBottom className="message-container">
        {messageList.map((messageContent)=>{
            return <div className='message' id={username===messageContent.author? "you" : "other"}>
                <div>
                <div className='message-content'>
                <div dangerouslySetInnerHTML={{ __html: messageContent.message[0]}}></div>
                </div>
                <div className='message-meta'>
                    <p id='time'>{messageContent.time}</p>
                    <p id='author'>{messageContent.author}</p>
                </div>
            </div>
            </div> 
        })}
        </ScrollToBottom>
    </div>
    <div className='chat-footer'>
        <section class="">
        <div className="flex-box">
        </div>
        <br/>
        <div className="row">
            <div className="col-md-3 col-sm-3">
            </div>
            <div className="col-md-6 col-sm-9">
                <div className="flex-box">
        <Editor value={currentMessage} Changehandler={(e)=>{
            setCurrentMessage(e)
        }} emoji={emoji}/>
        <div id='chaticon' style={{color:'white', backgroundColor:'black'}}>
        <input type="file" id="files" onChange={sendfile} style={{display:'none'}}/>
        <button><label for="files">+</label></button>
        <button onClick={showemoji}>☻</button>
        <button style={{fontSize:'19px'}} onClick={()=>setCurrentMessage('@')}>@</button>
        <button onClick={sendMessage} style={{color:'green'}}>&#9658;</button>
        </div>
                </div>
            </div>
        </div>
        {emoji&&<EmojiPicker onEmojiClick={emojiadd}/>}
    </section>
        
    
    </div>
    </div>
  )
}

export default Chats;

