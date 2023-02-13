import Store from 'electron-store'
import { Document } from '@shared/types/ipc'
import { randomUUID } from 'node:crypto'

interface StoreType {
  isFirstOpening: boolean
  documents: Record<string, Document>
}

export const store = new Store<StoreType>({
  defaults: {
    isFirstOpening: false,
    documents: {},
  },
})

if (store.get('isFirstOpening')) {
  const id = randomUUID()
  store.set(`documents.${id}`, {
    id,
    title: 'Presentation Example',
    content: `
    <p>&lt;!— This is a comment! It is not displayed. It also serves to configure the slides —&gt;</p><h1>Hello Slidefy</h1><blockquote><p>Making your presentations easier</p></blockquote><hr><h1>Code Block</h1><p>You can use blocks of code easily</p><pre><code class="language-javascript">const productName = "Slidefy";</code></pre><hr><p>&lt;!— .slide: transition=”convex" background=”aquamarine" —&gt;</p><h1>Custom Slide</h1><p>You can customize the transition effect and background of each slide, using a markdown comment with the tags below:</p><pre><code class="language-javascript">.slide: transition="fast" backgroundColor="aquamarine"</code></pre><hr><h1>Images and gifs</h1><p>Use images or gifs via web image url:</p><p><img class="object-scale-down w-6/12" src="https://source.unsplash.com/8xznAGy4HcY/800x400" alt="teste" contenteditable="false" draggable="true"><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p>
    `,
  })
  store.set('isFirstOpening', false)
}
