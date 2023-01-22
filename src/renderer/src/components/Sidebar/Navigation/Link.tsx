import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../../contexts/AppContext'

interface LinkProps {
  to: string
  children: string
}

export function Link({ to, children }: LinkProps) {
  const { setDocument } = useContext(AppContext)

  const setTitleDocumentState = () => {
    setDocument({ title: children })
  }

  return (
    <NavLink
      onClick={() => setTitleDocumentState()}
      to={to}
      className={({ isActive }) => {
        return clsx(
          'flex items-center text-sm gap-2 text-slidefy-100 hover:text-slidefy-50 py-1 px-3 rounded group hover:bg-slidefy-700',
          {
            'bg-slidefy-700': isActive,
          },
        )
      }}
    >
      <span className="truncate flex-1">{children}</span>
    </NavLink>
  )
}
