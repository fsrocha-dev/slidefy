import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { SlideShow } from '../modules/reveal'

interface IMarkdownData {
  id: string
  content: string
  title: string
}

export function Presentation() {
  const { id } = useParams<{ id: string }>()
  const [markdownData, setMarkdownData] = useState<IMarkdownData | null>(null)
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
      {markdownData && <SlideShow markdownData={markdownData} />}
    </main>
  )
}
