import { useEffect, useRef, useState } from "react"
import { Sidebar } from "../components/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { getConversations, updateMessagesAndConversations } from "../features/chatSlice"
import { ChatContainer, WhatsAppHome } from "../components/chat"
import SocketContext from "../context/SocketContext"
import { Call } from "../components/chat/call/Call"

const callData = {
  receiveingCall: false,
  callEnded: false
}

const Home = ({ socket }) => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)
  const [ onlineUsers, setOnlineUsers ] = useState([])
  const [typing, setTyping] = useState(false)
  const [call, setCall] = useState(callData)
  const [stream, setStream] = useState(callData)
  const [callAccepted, setCallAccepted] = useState(false)
  const myVideo = useRef(null)
  const userVideo = useRef(null)

  // join user into the socket io
  useEffect(() => {

    socket.emit('join', user._id) 

    // get online user 
    socket.on('get-online-users', (users) => {
      
      setOnlineUsers(users) 
    })

  }, [ user ])

  useEffect(() => {
    
    if( user ) {
      dispatch( getConversations( user.token ) )
    }

  }, [ user ])

  // listening to received messages
  useEffect(() => {

    socket.on('receive message', (message) => {
        dispatch(updateMessagesAndConversations(message))
    
    })

    socket.on('typing', (conversation) => {
      setTyping(conversation)
    });

    socket.on('stop typing', (conversation) => {
      setTyping(false)
    });
 
  }, []) 

  
  return (
   <>
       <div className='h-screen w-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden' >

      <div className='container h-screen flex' >
        {/* Sidebar */}
        <Sidebar onlineUsers={ onlineUsers } typing={ typing } />
        {
          activeConversation._id 
          ? <ChatContainer onlineUsers={ onlineUsers } typing={ typing } />
          : <WhatsAppHome />
        }
      </div>
      </div>
      <Call 
        call={ call } 
        setCall={ setCall } 
        callAccepted={ callAccepted }
        myVideo={ myVideo }
        userVideo={ userVideo }
        stream={ stream }
      />
    </>
  )
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    { (socket) => <Home {...props} socket={ socket } /> }
  </SocketContext.Consumer>
)

export default HomeWithSocket;