import { Routes } from './Routes'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import './styles/global.css'

export function App() {
  return (
    <div className="h-screen w-screen text-slidefy-100 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col max-h-scren">
        <Header />
        <Routes />
      </div>
    </div>
  )
}

export default App
