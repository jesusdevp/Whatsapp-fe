import { Contact } from "./Contact"


export const SearchResults = ({ searchResults }) => {
  return (
    <div className='w-full convers scrollbar' >
        {/* heading */}
        <div className='flex flex-col px-8 pt-8' >
            <h1 className='font-extralight text-sm text-green_2' >Contacts</h1>
            <span className='w-full mt-4 ml-10 border-b dark:border-b-dark_border_1' ></span>
        </div>

        {/* results */}
        <ul>
            {
                searchResults && searchResults.map((user) => (
                    <Contact
                        key={ user._id }
                        contact={ user } 
                    />
                ))
            }
        </ul>
    </div>
  ) 
}
 