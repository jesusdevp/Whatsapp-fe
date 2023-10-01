import { useState } from "react"
import SocketContext from "../../../context/SocketContext"
import { useSelector } from "react-redux"


const Input = ({ message, setMessage, textRef, socket }) => {

  const { activeConversation } = useSelector((state) => state.chat)

  const [typing, setTyping] = useState(false)

    const handleChange = (e) => {
        setMessage( e.target.value )
        if(!typing) { 
          setTyping(true)
          socket.emit('typing', activeConversation._id)
        }

        let lasTypingTime = new Date().getTime();
        let timer = 1500;

        setTimeout(() => {
          let timeNow = new Date().getTime()
          let timeDiff = timeNow - lasTypingTime

          if(timeDiff >= timer && typing) {
            socket.emit('stop typing', activeConversation._id)
            setTyping(false)
          }
        }, timer);

    }

  return (
    <div className='w-full' >
        <input 
            type='text'
            className='dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4'
            placeholder='Type a message'
            value={ message }
            onChange={ handleChange }
            ref={ textRef }
        />
    </div>
  )
}

const ConversationWithSocket = (props) => (
  <SocketContext.Consumer>
    { (socket) => <Input {...props} socket={ socket } /> }
  </SocketContext.Consumer>
)

export default ConversationWithSocket;