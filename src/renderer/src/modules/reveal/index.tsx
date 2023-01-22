import { useEffect, useState } from 'react'
import './styles/reveal.css'
import './styles/black.css'
import './styles/dracula.css'
import Deck from './Deck'
import Slide from './Slide'

export function SlideShow({ markdownData }) {
  const [slides, setSlides] = useState<any[]>([])

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

      const splitedProperties = slideConfigProrpeties?.split(' ')
      const slideProperties = {}
      let sectionWithoutConfig = ''

      if (splitedProperties.length > 0) {
        splitedProperties.forEach((p) => {
          const keyValue = p.split('=')
          const key = keyValue[0].replace(/[”"'“]/gi, '')
          const value = keyValue[1].replace(/[”"'“]/gi, '')

          slideProperties[key] = value
        })

        sectionWithoutConfig = decodedSection.replace(
          /(<p><!—(.+?)—><\/p>)/,
          '',
        )
      }

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
