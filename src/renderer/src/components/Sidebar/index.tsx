import * as Collapsible from '@radix-ui/react-collapsible'
import * as Navigation from './Navigation'
import clsx from 'clsx'
import { CaretDoubleLeft } from 'phosphor-react'
import { CreatePage } from './CreatePage'
import { Search } from './Search'
import { useQuery } from '@tanstack/react-query'

export function Sidebar() {
  const isMacOS = process.platform === 'darwin'

  const { data } = useQuery(['documents'], async () => {
    const response = await window.api.fetchDocuments()
    return response.data
  })

  return (
    <Collapsible.Content className="bg-slidefy-800 flex-shrink-0 border-r border-slidefy-600 h-screen relative group data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut overflow-hidden">
      <Collapsible.Trigger
        className={clsx(
          'absolute h-5 w-5 right-4 text-slidefy-200 hover:text-slidefy-50 inline-flex items-center justify-center',
          {
            'top-[1.125rem]': isMacOS,
            'top-6': !isMacOS,
          },
        )}
      >
        <CaretDoubleLeft className="h-4 w-4" />
      </Collapsible.Trigger>

      <div
        className={clsx('region-drag h-14', {
          block: isMacOS,
          hidden: !isMacOS,
        })}
      ></div>

      <div
        className={clsx(
          'flex-1 flex flex-col gap-8 h-full w-[240px] group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 transition-opacity duration-200',
          {
            'pt-6': !isMacOS,
          },
        )}
      >
        <Search />

        <Navigation.Root>
          <Navigation.Section>
            <Navigation.SectionTitle>Presentations</Navigation.SectionTitle>
            <Navigation.SectionContent>
              {data?.map((document) => {
                return (
                  <Navigation.Link
                    to={`/documents/${document.id}`}
                    key={document.id}
                  >
                    {document.title}
                  </Navigation.Link>
                )
              })}
            </Navigation.SectionContent>
          </Navigation.Section>
        </Navigation.Root>

        <CreatePage />
      </div>
    </Collapsible.Content>
  )
}
