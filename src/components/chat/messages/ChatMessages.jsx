import React from 'react'
import { useSelector } from 'react-redux'
import { Message } from './Message'

export const ChatMessages = () => {

    const { messages } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)

  return (
    <div className="mb-[60px] bg-[url('../../../../public/assets/background-chat.jpg')] bg-cover bg-no-repeat" >

        <div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]' >
            { messages && messages.map((message) => (
                <Message 
                    key={message._id} 
                    message={ message } 
                    me={ user._id === message.sender._id} 
                />
            ) ) }
        </div>
    </div>
  )
}
