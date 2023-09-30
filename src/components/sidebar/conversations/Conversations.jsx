import { useSelector } from "react-redux"
import { Conversation } from "."
import { checkOnlineStatus } from "../../../utils/chat"

export const Conversations = ({ onlineUsers }) => {

    const { conversations, activeConversation } = useSelector(state => state.chat)

    const { user } = useSelector((state) => state.user);

  return (
    <div className='convers scrollbar' >
        <ul>
        {
            conversations && 
                conversations
                    .filter((c) => c.latestMessage || c._id === activeConversation._id)
                    .map((conver) => {
                        let check = checkOnlineStatus(onlineUsers, user, conver.users)
                       return  (
                            <Conversation
                                key={ conver._id }
                                conver={ conver }
                                online={ check ? true : false }
                            />
                       )
                    })
        }
        </ul>
    </div>
  )
}
