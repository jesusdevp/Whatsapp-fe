import { useDispatch } from "react-redux"
import { logout, logoutUser } from "../../../features/userSlice"

export const Menu = () => {

    const dispatch = useDispatch()

    const handleLogout = async () => {
        const res = await dispatch(logoutUser())

        if( res.payload.message === 'logged out' ) {
            dispatch(logout())
        }
    }

  return (
    <div className='absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52' >
        <ul>
            <li className='py-3 pl-5 hover:bg-dark_bg_3' >
                <span>New group</span>
            </li>
            <li className='py-3 pl-5 hover:bg-dark_bg_3' >
                <span>New community</span>
            </li>
            <li className='py-3 pl-5 hover:bg-dark_bg_3' >
                <span>Starred message</span>
            </li>
            <li className='py-3 pl-5 hover:bg-dark_bg_3' >
                <span>Settings</span>
            </li>
            <li className='py-3 pl-5 hover:bg-dark_bg_3' onClick={() => handleLogout()} >
                <span>Logout</span>
            </li>
        </ul>
    </div>
  )
}
 