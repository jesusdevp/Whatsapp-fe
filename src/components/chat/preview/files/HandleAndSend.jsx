import { useDispatch, useSelector } from "react-redux"
import { Add } from "./Add"
import { CloseIcon, SendIcon } from "../../../../svg"
import { uploadFiles } from "../../../../utils/upload"
import { useState } from "react"
import { removeFiles, sendMessage } from "../../../../features/chatSlice"
import SocketContext from "../../../../context/SocketContext"
import { ClipLoader } from "react-spinners"
import VideoThumbnail from "react-video-thumbnail"


const HandleAndSend = ({ activeIndex, setActiveIndex, message, socket }) => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const { files, activeConversation } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)

    const { token } = user

    const sendMessageHandler = async (e) => {
        e.preventDefault()

        setLoading(true)

        const upload_files = await uploadFiles( files )

        // send message
        const values = {
            token,
            message,
            conver_id: activeConversation?._id,
            files: upload_files.length > 0 ? upload_files : []
        }

        let newMsg = await dispatch(sendMessage(values))
        socket.emit('send message', newMsg.payload)
        setLoading(false)
    }

    const handleRemoveFile = (index) => {
        dispatch(removeFiles(index))
    }

  return (
    <div className='w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2' >
        <span></span>

        <div className='flex items-center gap-x-2' >
            {
                files.map(( file, i ) => (
                    <div 
                        key={ i }
                        className={`fileThumbnail relative w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer
                            ${activeIndex === i ? 'border-[3px] !border-green_1' : ''}
                        `}
                        onClick={ () => setActiveIndex(i) }
                    >
                        {
                            file.type === 'IMAGE'
                                ? <img src={ file.fileData } alt="" className='w-full h-full object-cover' />
                            : file.type === 'VIDEO' ? (
                                    <VideoThumbnail videoUrl={ file.fileData } />
                                )
                                : <img src={`../../../../images/files/${ file.type }.png`} alt="" className='w-8 h-10 mt-1.5 ml-2.5' />
                        }
                        <div 
                            className="removeFileIcon hidden"
                            onClick={() => handleRemoveFile(i)}
                        >
                            <CloseIcon  className='dark:fill-white absolute right-0 top-0 w-4 h-4' />
                        </div>
                    </div>
                ))
            }
            <Add activeIndex={ activeIndex } />
        </div>
        <div 
            className='bg-green_1 w-14 h-14 mt-2 rounded-full flex items-center justify-center cursor-pointer'
            onClick={(e) => sendMessageHandler(e)}
        >
            {
                loading  
                    ? <ClipLoader color='#E9EDEF' />
                    :  <SendIcon className='fill-white' />
            }
        </div>
    </div>
  )
}

const ConversationWithSocket = (props) => (
    <SocketContext.Consumer>
      { (socket) => <HandleAndSend {...props} socket={ socket } /> }
    </SocketContext.Consumer>
  )

export default ConversationWithSocket;