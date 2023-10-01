
import { useDispatch, useSelector } from "react-redux"
import { ChatHeader } from "./header/ChatHeader"
import { ChatMessages } from "./messages/ChatMessages"
import { useEffect } from "react"
import { getConversationsMessages } from "../../features/chatSlice"
import ChatActions from "./actions/ChatActions"
import { checkOnlineStatus } from "../../utils/chat"

export const ChatContainer = ({ onlineUsers, typing }) => {

    const dispatch = useDispatch()
    const { activeConversation } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)

    const { token } = user

    const values = {
        token,
        conver_id: activeConversation?._id
    }

    useEffect(() => {

        if( activeConversation?._id ) {
            dispatch(getConversationsMessages(values))
        }

    }, [ activeConversation ])


  return (
    <div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden' >
        {/* container */}
        <div>
            <ChatHeader 
                online={checkOnlineStatus(onlineUsers, user, activeConversation.users)}
                typing={ typing }
            />

            <ChatMessages typing={ typing } />

            <ChatActions />
        </div>
    </div>
  )
}
