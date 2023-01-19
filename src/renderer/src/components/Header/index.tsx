import clsx from 'clsx'
import * as Collapsible from '@radix-ui/react-collapsible'
import {
  Presentation,
  CaretDoubleRight,
  TrashSimple,
  PlayCircle,
  XCircle,
  CodeSimple,
} from 'phosphor-react'
import * as Breadcrumbs from './Breadcrumbs'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Document } from '@shared/types/ipc'

interface HeaderProps {
  isSidebarOpen: boolean
}

export function Header({ isSidebarOpen }: HeaderProps) {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()

  const isMacOS = process.platform === 'darwin'

  const { mutateAsync: deleteDocument, isLoading: isDeletingDocument } =
    useMutation(
      async () => {
        await window.api.deleteDocument({ id: id! })
      },
      {
        onSuccess: () => {
          queryClient.setQueryData<Document[]>(['documents'], (documents) => {
            return documents?.filter((document) => document.id !== id)
          })
          navigate('/')
        },
      },
    )

  const sendToSlide = () => {
    navigate(`/presentation/${id}`)
  }

  const sendToDocument = () => {
    navigate(`/documents/${id}`)
  }

  const activePresentation = () => {
    const currentRoute = location.pathname.split('/')[1]
    if (currentRoute === 'presentation') return true
    return false
  }

  return (
    <div
      id="header"
      className={clsx(
        'border-b h-16 border-slidefy-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w-[calc(100vw-240px)]': isSidebarOpen,
        },
      )}
    >
      <Collapsible.Trigger
        className={clsx('h-5 w-5 text-slidefy-200 hover:text-slidefy-50', {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </Collapsible.Trigger>

      {id && (
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              {activePresentation() ? (
                <Presentation
                  weight="bold"
                  className="h-4 w-4 text-purple-500"
                />
              ) : (
                <CodeSimple weight="bold" className="h-4 w-4 text-purple-500" />
              )}
              Presentations
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>Nome documento</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="inline-flex region-no-drag">
            {activePresentation() ? (
              <button
                onClick={() => sendToDocument()}
                disabled={isDeletingDocument}
                className="inline-flex items-center gap-1 mr-3 text-slidefy-100 text-sm hover:text-slidefy-50 disabled:opacity-60"
              >
                <XCircle className="h-4 w-4" />
                Close
              </button>
            ) : (
              <>
                <button
                  onClick={() => sendToSlide()}
                  disabled={isDeletingDocument}
                  className="inline-flex items-center gap-1 mr-3 text-slidefy-100 text-sm hover:text-slidefy-50 disabled:opacity-60"
                >
                  <PlayCircle className="h-4 w-4" />
                  Play
                </button>
                <button
                  onClick={() => deleteDocument()}
                  disabled={isDeletingDocument}
                  className="inline-flex items-center gap-1 text-slidefy-100 text-sm hover:text-slidefy-50 disabled:opacity-60"
                >
                  <TrashSimple className="h-4 w-4" />
                  Delete
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
