import { useState } from "react"
import { ReturnIcon } from "../../../../svg"
import { UnderlineInput } from "./UnderlineInput"
import { MultipleSelect } from "./MultipleSelect"
import { useSelector } from "react-redux"
import axios from "axios"
import { ClipLoader } from "react-spinners"
import ValidIcon from "../../../../svg/Valid"


export const CreateGroup = ({ setShowCreateGroup }) => {

    const { user } = useSelector((state) => state.user)
    const { status } = useSelector((state) => state.chat)

    const [name, setName] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])

    const handleSearch = async (e) => {

        if( e.target.value  && e.key === 'Enter' ) {

            setSearchResults([])
  
          try {
            
            const { data } = await axios.get(`${ import.meta.env.VITE_API_ENDPOINT }/user?search=${ e.target.value }`, {
              headers: {
                Authorization: `Bearer ${ user?.token }`
              }
            })
  
            if( data.length > 0 ) {

                let tempArr = []

                data.forEach((user) => {
                    let temp = {
                        value: user._id,
                        label: user.name,
                        picture: user.picture
                    }

                    tempArr.push(temp)
                })

                setSearchResults( tempArr )
            } else {
                setSearchResults([])
            }
          } catch (error) {
            console.log(error.response.data.error)
          }
        } else {
          setSearchResults([])
        }
  
      }

    const createGroupHandler = () => {

    }

  return (
    <div className='createGroupAnimation relative flex0030 h-full z-40' >

        <div className='mt-5' >
            <button className='btn w-6 h-6 border' onClick={() => setShowCreateGroup(false)}>
                <ReturnIcon className='fill-white' />
            </button>
            <UnderlineInput name={ name } setName={ setName } />

            <MultipleSelect
                searchResults={ searchResults }
                selectedUsers={ selectedUsers }
                setSelectedUsers={ setSelectedUsers }
                handleSearch={ handleSearch }
            />

            <div className='absolute bottom-1/3 left-1/2 -translate-x-1/2'>
                <button
                    className='btn bg-green_1 scale-150 hover:bg-green-500'
                    onClick={() => createGroupHandler()}
                >
                    {status === 'loading' ? (
                        <ClipLoader color='#E9EDEF' size={25} />
                    ) : (
                        <ValidIcon className='fill-white mt-2 h-full' />
                    )}
                </button>
        </div>
        </div>
    </div>
  )
}
