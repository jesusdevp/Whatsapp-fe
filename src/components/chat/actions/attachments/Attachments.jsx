import { AttachmentIcon } from "../../../../svg"
import { Menu } from "./Menu"


export const Attachments = ({ showAttachments, setShowAttachments, setShowPicker }) => {

  return (
    <li className='relative' >
        <button 
          type='button' 
          className='btn'
          onClick={() => {
            setShowAttachments((prev) => !prev )
            setShowPicker(false)
          }}
        >
            <AttachmentIcon className='dark:fill-dark_svg_1' />
        </button>

        { showAttachments ? <Menu /> : null }

    </li>
  )
}
