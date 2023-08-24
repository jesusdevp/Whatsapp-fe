import { useEffect } from "react"
import { Sidebar } from "../components/sidebar"
import { useDispatch, useSelector } from "react-redux"
import { getConversations } from "../features/chatSlice"
import { WhatsAppHome } from "../components/chat"

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
    <div className='h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden' >

      <div className='container h-screen flex py-[19px]' >
        {/* Sidebar */}
        <Sidebar />
        {
          activeConversation.length ? 'home'
          : <WhatsAppHome />
        }
      </div>
    </div>
  )
}
