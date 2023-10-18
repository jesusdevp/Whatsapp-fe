import { useSelector } from "react-redux"
import { Add } from "./Add"
import { SendIcon } from "../../../../svg"


export const HandleAndSend = ({ activeIndex, setActiveIndex }) => {

    const { files } = useSelector((state) => state.chat)

  return (
    <div className='w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2' >
        <span></span>

        <div className='flex items-center gap-x-2' >
            {
                files.map(( file, i ) => (
                    <div 
                        key={ i }
                        className={`w-14 h-14 border dark:border-white mt-2 rounded-md overflow-hidden cursor-pointer
                            ${activeIndex === i ? 'border-[3px] !border-green_1' : ''}
                        `}
                        onClick={ () => setActiveIndex(i) }
                    >
                        {
                            file.type === 'IMAGE'
                                ? <img src={ file.fileData } alt="" className='w-full h-full object-cover' />
                                : <img src={`../../../../images/files/${ file.type }.png`} alt="" className='w-8 h-10 mt-1.5 ml-2.5' />
                        }
                    </div>
                ))
            }
            <Add activeIndex={ activeIndex } />
        </div>
        <div className='bg-green_1 w-14 h-14 mt-2 rounded-full flex items-center justify-center cursor-pointer' >
            <SendIcon className='fill-white' />
        </div>
    </div>
  )
}
