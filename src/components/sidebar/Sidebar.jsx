import { SidebarHeader } from "./header"
import { Notifications } from "./notifications/index"


export const Sidebar = () => {
  return (
    <div className='w-[40%] h-full select-none' >
        {/* SidebarHeader */}
        <SidebarHeader />

        {/* Notifications */}
        <Notifications />
    </div>
  )
}
