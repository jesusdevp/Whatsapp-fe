import { useRef, useState } from "react"
import { SendIcon } from "../../../svg"
import { Attachments } from "./Attachments"
import { EmojiPickerApp } from "./EmojiPicker"
import { Input } from "./Input"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage } from "../../../features/chatSlice"
import { ClipLoader } from "react-spinners"


export const ChatActions = () => {

    const textRef = useRef(null) 

    const dispatch = useDispatch()
    const { activeConversation, status } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    const { token } = user

    const [message, setMessage] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    

    const values = {
        message,
        conver_id: activeConversation?._id,
        files: [],
        token
    }

    const handleMessageSubmit = async (e) => {

        e.preventDefault()

        await dispatch( sendMessage(values) )

        setMessage('')
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
                />
                <Attachments />
            </ul>

            <Input 
                message={ message }
                setMessage={ setMessage }
                textRef={ textRef }
            />
            
            {
                status === 'loading' ? (
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
