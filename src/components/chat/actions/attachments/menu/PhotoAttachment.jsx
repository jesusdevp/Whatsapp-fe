import { useRef } from "react"
import { PhotoIcon } from "../../../../../svg"
import { useDispatch } from "react-redux"
import { addFiles } from "../../../../../features/chatSlice"


export const PhotoAttachment = () => {

    const inputRef = useRef(null)

    const dispatch = useDispatch()

    const handleImage = (e) => {

        let files = Array.from(e.target.files)
        files.forEach((img) => {
            if(img !== 'image/png' && 
                img !== 'image/jpg' &&
                img !== 'image/jpeg' &&
                img !== 'image/webp' && 
                img !== 'image/gif'
            ) { 
                files = files.filter((item) => item.name !== img.name);
                return;
            } else if (img.size > 1024 * 1024 * 10) {
                files = files.filter((item) => item.name !== img.name);
                return;
            } else {
                const reader = new FileReader()
                reader.readAsDataURL(img)
                reader.onload = ( e ) => {
                    dispatch(addFiles({ file: img, imgData: e.target.result, type: 'image' }))
                }
            }
        })


    }

  return (
    <li>
        <button 
            type='button' 
            className=" bg-[#BF59CF] rounded-full" 
            onClick={() => inputRef.current.click() } 
        >
            <PhotoIcon />
        </button>
        <input 
            type="file" 
            hidden 
            ref={ inputRef } 
            accept='image/png,image/jpeg,image/jpg,image/webp,image/gif'
            onChange={handleImage}
        />
    </li>
  )
}
