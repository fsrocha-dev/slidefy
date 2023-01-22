import { MagnifyingGlass } from 'phosphor-react'
import { SearchBar } from '../SearchBar'
import { useState } from 'react'

export function Search() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false)

  function handleOpenChange(isOpen: boolean) {
    setIsSearchBarOpen(isOpen)
  }

  return (
    <>
      <button
        onClick={() => handleOpenChange(true)}
        className="flex mx-5 items-center gap-2 text-slidefy-100 text-sm hover:text-slidefy-50"
      >
        <MagnifyingGlass className="w-5 h-5" />
        Quick search
      </button>

      <SearchBar open={isSearchBarOpen} onOpenChange={handleOpenChange} />
    </>
  )
}
