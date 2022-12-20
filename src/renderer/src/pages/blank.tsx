import { Link } from 'react-router-dom'

export function Blank() {
  return (
    <main className="flex-1 flex items-center justify-center text-slidefy-400">
      Selecione ou crie uma apresentação
      <Link to="/document">DOCUMENTO</Link>
    </main>
  )
}
