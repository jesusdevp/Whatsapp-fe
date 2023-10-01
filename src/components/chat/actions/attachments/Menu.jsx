import React from 'react'
import { CameraIcon, ContactIcon, DocumentIcon, PhotoIcon, PollIcon, StickerIcon } from '../../../../svg'
import { PhotoAttachment } from './menu/PhotoAttachment'

export const Menu = () => {

  return (
    <ul className='absolute bottom-14 openEmojiAnimation' >
        <li>
            <button type='button' className="rounded-full">
                <PollIcon />
            </button>
        </li>
        <li>
            <button type='button' className="bg-[#0EABF4] rounded-full">
                <ContactIcon />
            </button>
        </li>
        <li>
            <button type='button' className="bg-[#5F66CD] rounded-full">
                <DocumentIcon />
            </button>
        </li>
        <li>
            <button type='button' className="bg-[#D3396D] rounded-full">
                <CameraIcon />
            </button>
        </li>
        <li>
            <button type='button' className="rounded-full">
                <StickerIcon />
            </button>
        </li>
        <PhotoAttachment />
    </ul>
  )
}
