import { useRef, useState } from "react"
import { SendIcon } from "../../../svg"
import { Attachments } from "./attachments"
import { EmojiPickerApp } from "./EmojiPicker"
import { Input } from "./Input"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage } from "../../../features/chatSlice"
import { ClipLoader } from "react-spinners"
import SocketContext from "../../../context/SocketContext"


const ChatActions = ({ socket }) => {

    const textRef = useRef(null) 

    const dispatch = useDispatch();
    const [showPicker, setShowPicker] = useState(false);
    const [showAttachments, setShowAttachments] = useState(false)
    const [loading, setLoading] = useState(false)
    const { activeConversation, status } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    const { token } = user

    const [message, setMessage] = useState("");
    

    const values = {
        message,
        conver_id: activeConversation?._id,
        files: [],
        token
    }

    const handleMessageSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        let newMsg = await dispatch( sendMessage(values) )
        socket.emit('send message', newMsg.payload)

        setMessage('')
        setLoading(false)
    }

  return (
    <form 
        className='dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none'
        onSubmit={ (e) => handleMessageSubmit(e) }
    >
        <div className='w-full flex items-center gap-x-2' >
            <ul className='flex gap-x-2' >
                <EmojiPickerApp 
                    textRef={ textRef }
                    message={ message }
                    setMessage={ setMessage }
                    showPicker={ showPicker }
                    setShowPicker={ setShowPicker }
                    setShowAttachments={ setShowAttachments }
                />
                <Attachments 
                    showAttachments={ showAttachments }
                    setShowAttachments={ setShowAttachments }
                    setShowPicker={ setShowPicker }
                />
            </ul>

            <Input 
                message={ message }
                setMessage={ setMessage }
                textRef={ textRef }
            />
            
            {
                status === 'loading' && loading ? (
                    <div className='btn' >
                        <ClipLoader color='#E9EDEF' />
                    </div>
                ) : (
                    <button type='submit' className='btn' disabled={ message === '' ? true : false } >
                        <SendIcon className='dark:fill-dark_svg_1' />
                    </button>
                )
            }
        </div>
    </form>
  )
}

const ChatActionsWithSocket = (props) => (
    <SocketContext.Consumer>
        {(socket) => <ChatActions { ...props } socket={ socket } />}
    </SocketContext.Consumer>
)

export default ChatActionsWithSocket;