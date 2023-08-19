import { useSelector } from "react-redux"
import { ChatIcon, CommunityIcon, DotsIcon, StoryIcon } from '../../../svg'

export const SidebarHeader = () => {

    const { user } = useSelector((state) => state.user)

  return (
    <div className='h-[50px] dark:bg-dark_bg_2 flex items-center px16' >

        <div className='w-full flex items-center justify-between'>
            <button>
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
