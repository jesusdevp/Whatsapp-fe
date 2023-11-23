import { useDispatch, useSelector } from "react-redux"
import { CallIcon, DotsIcon, SearchLargeIcon, VideoCallIcon } from "../../../svg"
import { capitalize } from "../../../utils/strings"
import { getConversationByName, getConversationByPicture } from "../../../utils/chat"
import { openModal } from "../../../features/userSlice"

export const ChatHeader = ({ online, typing, callUser }) => {

    const { activeConversation } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const handleOpenModal = () => {
        dispatch(openModal(activeConversation))
    }

  return (
    <div className='h-[59px] dark:bg-dark_bg_2 flex items-center px16 select-none' >
        <div className='w-full flex items-center justify-between' >
            <div className='flex items-center gap-x-4' >
                <button className='btn' onClick={() => handleOpenModal()} >
                    <img 
                        src={ activeConversation.isGroup 
                            ? activeConversation.picture 
                            : getConversationByPicture(user, activeConversation.users) 
                        } 
                        alt={`${ activeConversation.picture } picture`} 
                        className='w-full h-full rounded-full object-cover' 
                    />
                </button>
                <div className='flex flex-col' >
                    <h1 className='dark:text-white text-md font-bold' >
                        { activeConversation.isGroup 
                        ? activeConversation.name 
                        : capitalize(getConversationByName(user, activeConversation.users).split(' ')[0]) 
                        }
                    </h1>
                    <span className='text-xs dark:text-dark_svg_2' >{ typing === activeConversation._id ? 'typing...' :  online ? "online" : '' }</span>
                </div>
            </div>
            <ul className='flex items-center gap-x-2.5' >
                {1 == 1 ? (
                    <li onClick={() => callUser()}>
                    <button className="btn">
                        <VideoCallIcon className='dark:fill-dark_svg_1 ' />
                    </button>
                    </li>
                ) : null}
                {1 == 1 ? (
                    <li>
                        <button className="btn">
                            <CallIcon className='dark:fill-dark_svg_1' />
                        </button>
                    </li>
                ) : null}
                <li>
                    <button className='btn' >
                        <SearchLargeIcon className='dark:fill-dark_svg_1' />
                    </button>
                </li>
                <li>
                    <button className='btn' >
                        <DotsIcon className='dark:fill-dark_svg_1' />
                    </button>
                </li>
            </ul>
        </div>
    </div>
  )
}
