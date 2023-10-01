import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Message } from './Message'
import { Typing } from './Typing'

export const ChatMessages = ({ typing }) => {

    const { messages, activeConversation } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    const endRef = useRef()

    useEffect(() => {

        scrollToBottom()

    }, [messages])

    const scrollToBottom = () =>  {
        endRef.current.scrollIntoView({ behavior: 'smooth' })
    }

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
            { typing === activeConversation._id ? <Typing /> : '' }
            <div className='mt-2' ref={ endRef } ></div>
        </div>
    </div>
  )
}
