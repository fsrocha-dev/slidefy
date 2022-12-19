import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
}

export function Section(props: SectionProps) {
  return <div className="flex flex-col gap-2" {...props} />
}
