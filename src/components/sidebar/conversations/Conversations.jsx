import { useSelector } from "react-redux"
import { Conversation } from "./Conversation"


export const Conversations = () => {

    const { conversations, activeConversation } = useSelector(state => state.chat)

  return (
    <div className='convers scrollbar' >
        <ul>
        {
            conversations && 
                conversations
                    .filter((c) => c.latestMessage || c._id === activeConversation._id)
                    .map((conver) => (
                        <Conversation 
                            key={ conver._id }
                            conver={ conver }
                        />
            ))
        }
        </ul>
    </div>
  )
}
