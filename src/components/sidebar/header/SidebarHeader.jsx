import { useDispatch, useSelector } from "react-redux"
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from '../../../svg'
import { useState } from "react"
import { Menu } from "./Menu"
import { CreateGroup } from "./createGroup/CreateGroup"
import { changeToggle, openModal } from "../../../features/userSlice"
import { ModalImage } from "../../ui/ModalImage"

export const SidebarHeader = () => {

    const dispatch = useDispatch()
    const { user, toggle } = useSelector((state) => state.user)

    const [showCreateGroup, setShowCreateGroup] = useState(false)

    const handleToggleMenu = () => {
        if(toggle === '') {
            dispatch(changeToggle('menu'))
        }
    }

    function openModalUI() {
        dispatch(openModal(user))
      }
    

  return (
    <>
    <div className='h-[58px] dark:bg-dark_bg_2 flex items-center px16' >
        <div className='w-full flex items-center justify-between'>
            <button onClick={() => openModalUI()} >
                <figure className='btn' >
                    <img 
                        src={ user.picture } 
                        alt={ user.name } 
                        className='h-full w-full rounded-full object-cover' 
                    />
                </figure>
            </button>
            <ul className='flex items-center gap-x-2'>
                <li>
                    <button className='btn' >
                        <CommunityIcon className='dark:fill-dark_svg_1' />
                    </button>
                </li>
                <li>
                    <button className='btn' >
                        <StoryIcon className='dark:fill-dark_svg_1' />
                    </button>
                </li>
                <li>
                    <button className='btn' >
                        <ChatIcon className='dark:fill-dark_svg_1' />
                    </button>
                </li>
                <li className='relative' onClick={() => handleToggleMenu()} >
                    <button className={`btn ${ toggle === 'menu' ? 'bg-dark_hover_1' : '' }`} >
                        <DotsIcon className='dark:fill-dark_svg_1' />
                    </button>
                    {
                        toggle === 'menu' ? <Menu setShowCreateGroup={ setShowCreateGroup } /> : null
                    }
                </li>
            </ul>
        </div>
    </div>

    { showCreateGroup && <CreateGroup setShowCreateGroup={ setShowCreateGroup } /> }
    <ModalImage />
    </>
  )
}
