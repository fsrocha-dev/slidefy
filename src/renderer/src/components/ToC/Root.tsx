import { ReactNode } from 'react'

interface ToCRootProps {
  children: ReactNode
}

export function ToCRoot(props: ToCRootProps) {
  return (
    <div
      className="flex flex-col text-sm text-slidefy-100 gap-2 mt-2"
      {...props}
    />
  )
}
