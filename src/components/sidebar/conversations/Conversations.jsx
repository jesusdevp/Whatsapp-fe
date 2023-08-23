import { useSelector } from "react-redux"
import { Conversation } from "./Conversation"


export const Conversations = () => {

    const { conversations } = useSelector(state => state.chat)

  return (
    <div className='convers scrollbar' >
        <ul>
        {
            conversations && 
                conversations.map((conver) => (
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
