import { useEffect, useState, useRef } from 'react'
import './styles/reveal.css'
import './styles/black.css'
import './styles/dracula.css'
import Deck from './Deck'
import Slide from './Slide'

export function SlideShow({ markdownData }) {
  const [slides, setSlides] = useState<any[]>([])
  const dataFetchedRef = useRef(false)

  const decode = (str: string) => {
    const txt = document.createElement('textarea')

    txt.innerHTML = str

    return txt.value
  }

  const getSections = (section: string, index: number) => {
    let slideConfigs = {}
    const decodedSection = decode(section)

    slideConfigs = getSectionConfig(decodedSection)

    const sectionWithoutComments = removeSectionComments(decodedSection)

    setSlides((oldArray) => [
      ...oldArray,
      <Slide {...slideConfigs} key={index}>
        {sectionWithoutComments}
      </Slide>,
    ])
  }

  const getSectionConfig = (decodedSection: string) => {
    const configs = {}

    const regexGetCommentConfigs = /(<p><!—(?<configs>.+?)—><\/p>)/
    const slideConfig = decodedSection.match(regexGetCommentConfigs)?.groups

    if (slideConfig?.configs.includes('.slide')) {
      const slideConfigProrpeties = slideConfig?.configs
        .replace(' .slide:', '')
        .trim()

      const splitedProperties = slideConfigProrpeties?.split(' ')

      if (splitedProperties.length > 0) {
        splitedProperties.forEach((p) => {
          const keyValue = p.split('=')
          const key = keyValue[0].replace(/[”"'“]/gi, '')
          const value = keyValue[1].replace(/[”"'“]/gi, '')

          configs[key] = value
        })
      }
    }
    return configs
  }

  const removeSectionComments = (decodedSection: string) => {
    const sectionWithoutConfig = decodedSection.replace(
      /(<p><!— .slide:(.+?)—><\/p>)/i,
      '',
    )

    return sectionWithoutConfig
  }

  useEffect(() => {
    if (dataFetchedRef.current) return
    dataFetchedRef.current = true

    const createSlides = () => {
      const splitedSections = markdownData.content?.split('<hr>')

      splitedSections?.forEach((item, index) => {
        getSections(item, index)
      })
    }

    createSlides()
  })

  return (
    <main className="flex gap-8 h-full w-full">
      {slides && <Deck>{slides}</Deck>}
    </main>
  )
}
