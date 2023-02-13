import { useQuery } from '@tanstack/react-query'
import { Command } from 'cmdk'
import { File, MagnifyingGlass } from 'phosphor-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  open: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function SearchBar({ open, onOpenChange }: SearchBarProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        onOpenChange(!open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpenChange, open])

  const { data } = useQuery(['documents'], async () => {
    const response = await window.api.fetchDocuments()
    return response.data
  })

  function handleOpenDocument(id: string) {
    navigate(`/documents/${id}`)
    onOpenChange(false)
  }

  return (
    <Command.Dialog
      className="fixed top-24 left-1/2 -translate-x-1/2 w-[480px] max-w-full bg-slidefy-800 rounded-md shadow-2xl text-slidefy-100 border border-slidefy-600"
      open={open}
      onOpenChange={onOpenChange}
      label="Search"
    >
      <div className="flex items-center gap-2 border-b border-slidefy-700 p-4">
        <MagnifyingGlass className="w-5 h-5" />
        <Command.Input
          autoFocus
          placeholder="Search documents..."
          className="w-full bg-transparent focus:outline-none text-sm text-slidefy-50 placeholder:text-slidefy-200"
        />
      </div>
      <Command.List className="py-2 max-h-48 scrollbar-thin scrollbar-thumb-slidefy-600 scrollbar-track-slidefy-800">
        <Command.Empty className="py-3 px-4 text-slidefy-200 text-sm">
          No documents found.
        </Command.Empty>

        {data?.map((document) => {
          return (
            <Command.Item
              key={document.id}
              onSelect={() => handleOpenDocument(document.id)}
              className="py-3 px-4 text-slidefy-50 text-sm flex items-center gap-2 hover:bg-slidefy-700 aria-selected:!bg-slidefy-600"
            >
              <File className="w-4 h-4" />
              {document.title}
            </Command.Item>
          )
        })}
      </Command.List>
    </Command.Dialog>
  )
}
