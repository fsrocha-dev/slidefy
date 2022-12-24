import Store from 'electron-store'

interface StoreType {
  documents: Record<string, any>
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
  },
})
