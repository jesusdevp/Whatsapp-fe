import { useState } from "react"
import { SidebarHeader } from "./header"
import { Notifications } from "./notifications"
import { Search } from "./search"
import { Conversations } from "./conversations"

export const Sidebar = () => {

    const [searchResults, setSearchResults] = useState([])

  return (
    <div className='w-[40%] h-full select-none' >
        {/* SidebarHeader */}
        <SidebarHeader />

        {/* Notifications */}
        <Notifications />

        {/* Search */}
        <Search searchLength={ searchResults.length } />

        {/* conversations */}
        <Conversations />
    </div>
  )
}
