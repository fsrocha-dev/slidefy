import * as Collapsible from '@radix-ui/react-collapsible'

import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export function Default() {
  const { setIsSidebarOpen, isSidebarOpen } = useContext(AppContext)

  return (
    <Collapsible.Root
      open={isSidebarOpen}
      onOpenChange={setIsSidebarOpen}
      className="h-screen w-screen text-slidefy-100 flex"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-scren">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}

export default Default
