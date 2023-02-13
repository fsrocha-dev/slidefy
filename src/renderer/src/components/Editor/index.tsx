import '../../styles/codeEditor.scss'
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from '@tiptap/extension-image'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { lowlight } from 'lowlight'
import { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'

lowlight.registerLanguage('html', html)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('js', js)
lowlight.registerLanguage('ts', ts)

export interface OnContentUpdatedParams {
  title: string
  content: string
}

interface EditorProps {
  content: string
  onContentUpdated: (params: OnContentUpdatedParams) => void
}

export function Editor({ content, onContentUpdated }: EditorProps) {
  const { setDocument } = useContext(AppContext)

  const getTitleAndContent = (editor) => {
    const contentRegex = /(<h1>(?<title>.+?)<\/h1>(?<content>.+)?)/
    const parsedContent = editor.getHTML().match(contentRegex)?.groups

    const title = parsedContent?.title ?? 'Untitled'
    const content = parsedContent?.content ?? ''

    setDocument({ title })
    return { title, content }
  }

  const editor = useEditor({
    extensions: [
      Document.extend({
        content: 'heading block*',
      }),
      StarterKit.configure({
        document: false,
      }),
      HorizontalRule,
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'object-scale-down w-6/12',
        },
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: 'Type something...',
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none',
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
    ],
    onUpdate: ({ editor }) => {
      const { title, content } = getTitleAndContent(editor)
      onContentUpdated({ title, content })
    },
    content,
    autofocus: 'end',
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose prose-invert prose-headings:mt-0',
      },
    },
  })

  return (
    <EditorContent className="w-[65ch] pb-16" editor={editor}></EditorContent>
  )
}
