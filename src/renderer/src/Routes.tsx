import { Router, Route } from 'electron-router-dom'

import { Blank } from './pages/blank'
import { Document } from './pages/document'
import { Presentation } from './pages/Presentation'
import Default from './layouts/default'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/documents/:id" element={<Document />} />
          <Route path="/presentation/:id" element={<Presentation />} />
        </Route>
      }
    />
  )
}
