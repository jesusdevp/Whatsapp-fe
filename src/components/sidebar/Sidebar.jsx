import { useState } from "react"
import { SidebarHeader } from "./header"
import { Notifications } from "./notifications"
import { Search } from "./search"
import { Conversations } from "./conversations"
import { SearchResults } from "./search"

export const Sidebar = () => {

    const [searchResults, setSearchResults] = useState([])

  return (
    <div className='w-[40%] h-full select-none' >
        {/* SidebarHeader */}
        <SidebarHeader />

        {/* Notifications */}
        <Notifications />

        {/* Search */}
        <Search 
          searchLength={ searchResults.length }
          setSearchResults={ setSearchResults }
        />

        {
          searchResults.length > 0 ? (
            <>
              <SearchResults searchResults={ searchResults } setSearchResults={ setSearchResults } />
            </>
          ) : (
            <>
              {/* conversations */}
              <Conversations />
            </>
          )
        }
    </div>
  )
}
