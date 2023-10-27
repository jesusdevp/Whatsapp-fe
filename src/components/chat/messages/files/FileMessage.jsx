import moment from "moment"
import TraingleIcon from "../../../../svg/Traingle"
import { FileImageVideo } from "./FileImageVideo"
import FileOthers from "./FileOthers"


export const FileMessage = ({ file, message, me }) => {
  
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? 'ml-auto justify-end' : ''
    }`} 
>
    {/* container */}
    <div>
        <div className={`relative h-full dark:text-dark_text_1 rounded-lg 
            ${ me ? 'border-[3px] border-green_3' : 'dark:bg-dark_bg_2' } 
            ${
                me && file.file.public_id.split(".")[1] === "png"
                  ? "bg-white"
                  : "bg-green_3 p-1"
            }
            `} 
        >
            {/* message */}

            <div
                className={`h-full text-sm ${
                    file.type !== "IMAGE" && file.type !== "VIDEO" ? "pb-5" : ""
                  }`} 
            >
                {
                    file.type === 'IMAGE' || file.type === 'VIDEO'
                    ? <FileImageVideo url={ file.file.secure_url } type={ file?.type } />
                    : <FileOthers file={ file.file } type={ file.type } />
                }
            </div>

            {/* date */}
            <span className='absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none' >
                { moment(message.createdAt).format('HH:mm') }
            </span>

            {
                !me ? (
                    <span>
                        <TraingleIcon className='dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5' />
                    </span>
                ) : null
            }
        </div>
    </div>

</div>
  )
}
