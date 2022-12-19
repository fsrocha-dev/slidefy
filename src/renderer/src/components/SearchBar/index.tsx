import { Command } from 'cmdk'
import { File, MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'

export function SearchBar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((state) => !state)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setOpen])

  return (
    <Command.Dialog
      className="fixed top-24 left-1/2 -translate-x-1/2 w-[480px] max-w-full bg-slidefy-800 rounded-md shadow-2xl text-slidefy-100 border border-slidefy-600"
      open={open}
      onOpenChange={setOpen}
      label="Search"
    >
      <div className="flex items-center gap-2 border-b border-slidefy-700 p-4">
        <MagnifyingGlass className="w-5 h-5" />
        <Command.Input
          autoFocus
          placeholder="Buscar documentos..."
          className="w-full bg-transparent focus:outline-none text-sm text-slidefy-50 placeholder:text-slidefy-200"
        />
      </div>
      <Command.List className="py-2 max-h-48 scrollbar-thin scrollbar-thumb-slidefy-600 scrollbar-track-slidefy-800">
        <Command.Empty className="py-3 px-4 text-slidefy-200 text-sm">
          Nenhum documento encontrado.
        </Command.Empty>

        <Command.Item className="py-3 px-4 text-slidefy-50 text-sm flex items-center gap-2 hover:bg-slidefy-700 aria-selected:!bg-slidefy-600">
          <File className="w-4 h-4" />
          Untitled
        </Command.Item>

        <Command.Item className="py-3 px-4 text-slidefy-50 text-sm flex items-center gap-2 hover:bg-slidefy-700 aria-selected:!bg-slidefy-600">
          <File className="w-4 h-4" />
          Ignite
        </Command.Item>

        <Command.Item className="py-3 px-4 text-slidefy-50 text-sm flex items-center gap-2 hover:bg-slidefy-700 aria-selected:!bg-slidefy-600">
          <File className="w-4 h-4" />
          Discover
        </Command.Item>

        <Command.Item className="py-3 px-4 text-slidefy-50 text-sm flex items-center gap-2 hover:bg-slidefy-700 aria-selected:!bg-slidefy-600">
          <File className="w-4 h-4" />
          Rocketseat
        </Command.Item>
      </Command.List>
    </Command.Dialog>
  )
}
