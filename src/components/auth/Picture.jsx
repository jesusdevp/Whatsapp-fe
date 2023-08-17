import { useRef, useState } from "react"

export const Picture = ({ redeablePicture, setPicture, setRedeablePicture }) => {

    const [error, setError] = useState('')
    const inputRef = useRef()

    const handlePicture = (e) => {
        let pic = e.target.files[0]

        if( 
            pic.type !== 'image/png' && 
            pic.type !== 'image/jpg' &&
            pic.type !== 'image/jpeg' &&
            pic.type !== 'image/webp'
        ) {
            setError(`${ pic.name } format is not supported`)
            return;
        } else if( pic.size > 1024 * 1024 * 5 ) { // 5MB
            setError(`${ pic.name } is too large, maximum 5mb allowed`);
            return;
        } else {
            setError('')
            setPicture(pic)

            const reader = new FileReader()
            reader.readAsDataURL( pic )
            reader.onload = ( e ) => {
                setRedeablePicture( e.target.result )
            }
        }
    }

    const handleChangePic = () => {
        setPicture('')
        setRedeablePicture('')
    }

  return (
    <div className='mt-8 content-center dark:text-dark_text_1 space-y-1' >
        <label htmlFor='picture' className='text-sm font-bold tracking-wide' >
            Picture (Optional)
        </label>
        {
            redeablePicture ?
            <div>
                <img 
                    src={ redeablePicture } 
                    alt='picture'
                    className='w-20 h-20 object-cover rounded-full'
                />
                <div 
                    className='mt-2 py-1 w-20 bg-dark_bg_3 rounded-md text-xs font-bold flex items-center justify-center cursor-pointer' 
                    onClick={ () => handleChangePic() }
                >
                    Remove
                </div>
            </div> :
            <div
                className='w-full h-12 bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer'
                onClick={() => inputRef.current.click()}
            >
                Upload image
            </div>
        }
        <input 
            type='file' 
            name='name' 
            id='picture' 
            hidden 
            ref={ inputRef }
            accept='image/png,image/jpg,image/jpeg,image/webp'
            onChange={ handlePicture }
        />

        <div className='div mt-2'>
            <p className='text-red-400' >{ error }</p>
        </div>
    </div>
  )
}
