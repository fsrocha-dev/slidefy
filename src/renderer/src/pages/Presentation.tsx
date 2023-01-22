import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SlideShow } from '../modules/reveal'

export function Presentation() {
  const { id } = useParams<{ id: string }>()
  const [markdownData, setMarkdownData] = useState(
    {} as { id: string; content: string; title: string },
  )

  useQuery(
    ['document', id],
    async () => {
      const response = await window.api.fetchDocument({ id: id! })

      return response.data
    },
    { onSuccess: setMarkdownData, refetchOnWindowFocus: false },
  )

  return (
    <main className="flex gap-8 h-full w-full">
      <SlideShow markdownData={markdownData} />
    </main>
  )
}
