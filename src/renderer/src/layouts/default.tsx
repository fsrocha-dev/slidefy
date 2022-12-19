import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

export function Default() {
  return (
    <div className="h-screen w-screen text-slidefy-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-scren">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Default
