import { useEffect, useRef, useState } from "react"
import Peer from 'simple-peer';
import { Sidebar } from "../components/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { getConversations, updateMessagesAndConversations } from "../features/chatSlice"
import { ChatContainer, WhatsAppHome } from "../components/chat"
import SocketContext from "../context/SocketContext"
import { Call } from "../components/chat/call/Call"
import { getConversationById, getConversationByName, getConversationByPicture } from "../utils/chat"

const callData = {
  socketId: '',
  receiveingCall: false,
  callEnded: false,
  name: '',
  picture: '',
  signal: ''
}

const Home = ({ socket }) => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)
  const [ onlineUsers, setOnlineUsers ] = useState([])
  const [typing, setTyping] = useState(false)
  const [call, setCall] = useState(callData)
  const [stream, setStream] = useState(null)
  const [callAccepted, setCallAccepted] = useState(false)
  const [show, setShow] = useState(false)
  const myVideo = useRef()
  const userVideo = useRef()

  const { socketId } = call

  // join user into the socket io
  useEffect(() => {

    socket.emit('join', user._id) 

    // get online user 
    socket.on('get-online-users', (users) => {
      
      setOnlineUsers(users) 
    })

  }, [ user ])

  useEffect(() => {
      setupMedia()
        .then((stream) => {
          setStream(stream)
        })
        .catch((error) => {
          console.error('Error al obtener el flujo de medios', error)
        })

      socket.on('setup socket', (id) => {
        setCall({ ...call, socketId: id });
      });

      socket.on('call user', (data) => {
        setCall({ 
          ...call,
          socketId: data.from,
          name: data.name,
          picture: data.picture,
          signal: data.signal,
          receiveingCall: true,
         })
      })
  }, [])

  

  const callUser = () => {
    enableMedia()
    setCall({ 
      ...call, 
      name: getConversationByName(user, activeConversation.users),
      picture: getConversationByPicture(user, activeConversation.users)
    })


    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    })

    peer.on('signal', (data) => {
      socket.emit('call user', {
        userToCall: getConversationById(user, activeConversation.users),
        signal: data,
        from: socketId,
        name: user.name,
        picture: user.picture
      })
    })
  }

  const setupMedia = () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        resolve(stream);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
    setShow(true);
  };

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
          ? <ChatContainer onlineUsers={ onlineUsers } typing={ typing } callUser={ callUser } />
          : <WhatsAppHome />
        }
      </div>
      </div>
      <div className={(show || call.signal) && !call.callEnded ? '' : 'hidden'} >
        <Call 
          call={ call } 
          setCall={ setCall } 
          callAccepted={ callAccepted }
          myVideo={ myVideo }
          userVideo={ userVideo }
          stream={ stream }
        />
      </div>
    </>
  )
}

const HomeWithSocket = (props) => (
  <SocketContext.Consumer>
    { (socket) => <Home {...props} socket={ socket } /> }
  </SocketContext.Consumer>
)

export default HomeWithSocket;