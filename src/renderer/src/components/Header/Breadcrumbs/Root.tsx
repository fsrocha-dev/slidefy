import { ReactNode } from 'react'

interface RootProps {
  children: ReactNode
}

export function Root(props: RootProps) {
  return (
    <div className="flex-1 overflow-hidden flex items-center">
      <div className="inline-flex gap-2 text-sm text-slidefy-100 items-center whitespace-nowrap region-no-drag">
        {props.children}
      </div>
    </div>
  )
}
