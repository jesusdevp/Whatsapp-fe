import { useEffect } from "react"
import { Sidebar } from "../components/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { getConversations } from "../features/chatSlice"
import { ChatContainer, WhatsAppHome } from "../components/chat"

export const Home = () => {

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)

  useEffect(() => {
    
    if( user ) {
      dispatch( getConversations( user.token ) )
    }

  }, [ user ])
  

  return (
    <div className='h-screen w-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden' >

      <div className='container h-screen flex' >
        {/* Sidebar */}
        <Sidebar />
        {
          activeConversation._id 
          ? <ChatContainer />
          : <WhatsAppHome />
        }
      </div>
    </div>
  )
}
