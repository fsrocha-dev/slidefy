import React, { SetStateAction, createContext, useState } from 'react'

interface IAppContext {
  isSidebarOpen: boolean
  document: {
    title: string
  }
  setDocument: React.Dispatch<SetStateAction<{ title: string }>>
  setIsSidebarOpen: React.Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<IAppContext>({
  document: {
    title: '',
  },
  isSidebarOpen: true,
  setDocument: () => console.log('document state'),
  setIsSidebarOpen: () => console.log('sidebar state'),
})

export const AppProvider = ({ children }) => {
  const [document, setDocument] = useState({ title: '' })
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <AppContext.Provider
      value={{ document, setDocument, isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </AppContext.Provider>
  )
}
