import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import '../styles/reveal.css'
import '../styles/black.css'
import '../styles/monokai.css'
import Deck from '../modules/reveal/Deck'
import Slide from '../modules/reveal/Slide'

export function Presentation() {
  const { id } = useParams<{ id: string }>()
  const [markdownData, setMarkdownData] = useState(
    {} as { id: String; content: String; title: String },
  )
  const [slides, setSlides] = useState<any[]>([])

  useQuery(
    ['document', id],
    async () => {
      const response = await window.api.fetchDocument({ id: id! })

      return response.data
    },
    { onSuccess: setMarkdownData, refetchOnWindowFocus: false },
  )

  const decode = (str) => {
    const txt = document.createElement('textarea')

    txt.innerHTML = str

    return txt.value
  }

  const getSectionConfigs = (section, index) => {
    const decodedSection = decode(section)

    const regexGetCommentConfigs = /(<p><!—(?<configs>.+?)—><\/p>)/
    const slideConfig = decodedSection.match(regexGetCommentConfigs)?.groups
    if (slideConfig && slideConfig?.configs.includes('.slide')) {
      const slideConfigProrpeties = slideConfig?.configs
        .replace(' .slide:', '')
        .trim()

      const splitedProperties = slideConfigProrpeties.split(' ')
      const slideProperties = {}

      splitedProperties.forEach((p) => {
        const keyValue = p.split('=')
        const key = keyValue[0].replace(/[”"']/gi, '')
        const value = keyValue[1].replace(/[”"']/gi, '')

        slideProperties[key] = value
      })

      const sectionWithoutConfig = decodedSection.replace(
        /(<p><!—(.+?)—><\/p>)/,
        '',
      )

      return (
        <Slide {...slideProperties} key={index}>
          {sectionWithoutConfig}
        </Slide>
      )
    }
    return <Slide key={index}>{section}</Slide>
  }

  useEffect(() => {
    const splitedSections = markdownData.content?.split('<hr>')

    splitedSections?.forEach((item, index) => {
      setSlides((oldArray) => [...oldArray, getSectionConfigs(item, index)])
    })
  }, [markdownData.content])

  return (
    <main className="flex gap-8 h-full w-full">
      <Deck>{slides}</Deck>
    </main>
  )
}
