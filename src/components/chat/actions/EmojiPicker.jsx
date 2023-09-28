import { useEffect, useState } from "react"
import { CloseIcon, EmojiIcon } from "../../../svg"
import EmojiPicker from "emoji-picker-react"


export const EmojiPickerApp = ({ textRef, message, setMessage, showPicker, setShowPicker, setShowAttachments }) => {

  
  const [cursorPosition, setCursorPosition] = useState(null)
  

  useEffect(() => {

    if (textRef.current && cursorPosition !== null) {
          textRef.current.selectionEnd = cursorPosition 
      }

  }, [ cursorPosition ])

  const handleEmoji = ( emojiData, e ) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);

  }

  return (
    <li>
        <button 
          className='btn' 
          type='button'
          onClick={() => {
            setShowPicker((prev) => !prev)
            setShowAttachments(false)
          }}
        >
            {
              showPicker ? (
                <CloseIcon className='dark:fill-dark_svg_1' />
              ) : (
                <EmojiIcon className='dark:fill-dark_svg_1' />
              )
            }
        </button>
        {
          showPicker ? (
            <div className='openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full' >
              <EmojiPicker theme="dark" onEmojiClick={ handleEmoji } />
            </div>
          ) : null
        }
    </li>
  )
}
