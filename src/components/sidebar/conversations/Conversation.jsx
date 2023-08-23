import React from 'react'
import { dateHandler } from '../../../utils/date'

export const Conversation = ({ conver }) => {
    
  return (
    <li className='list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]' >
        
        <div className='relative w-full flex items-center justify-between py-[10px]' >
            {/* left */}
            <div className='flex items-center gap-x-3'>
                {/* user picture conversation */}
                <div className='relative h-[50px] min-w-[50px] max-w-[50px] rounded-full overflow-hidden'>
                    <img 
                        src={ conver.picture } 
                        alt={ conver.name } 
                        className='w-full h-full object-cover' 
                    />
                </div>
                {/* Conversation name and message */}
                <div className='w-full flex flex-col' >
                    <h1 className='font-bold flex items-center gap-x-2' > { conver.name } </h1>

                    <div>
                        <div className='flex items-center gap-x-1 dark:text-dark_text_2'  >
                            <div className='flex-1 items-center gap-x-1 dark:text-dark_text_2'  >
                                <p> { conver.latestMessage?.message } </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* right */}
            <div className='flex flex-col gap-y-4 items-end text-xs' >
                <span className='dark:text-dark_text_2' >
                    { dateHandler( conver.createdAt ) }
                </span>
            </div>
        </div>
        {/* border */}
        <div className='ml-16 border-b dark:border-b-dark_border_1' ></div>
    </li>
  )
}
