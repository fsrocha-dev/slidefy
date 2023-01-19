import React, { useEffect } from 'react'
import Reveal from 'reveal.js'
import Highlight from 'reveal.js/plugin/highlight/highlight'

const Deck = ({ children }) => {
  useEffect(() => {
    const deck = new Reveal()
    deck.initialize({ plugins: [Highlight] })
  })

  return (
    <div className="reveal">
      <div className="slides">{children}</div>
    </div>
  )
}

export default Deck
