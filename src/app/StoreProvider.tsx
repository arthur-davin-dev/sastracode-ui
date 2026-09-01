'use client'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import { makeStore, AppStore } from '../lib/store'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [store] = useState<AppStore>(() => makeStore())

  // Enables the api's `refetchOnFocus` / `refetchOnReconnect` — the fallback
  // path for picking up admin edits when the realtime socket misses an event.
  useEffect(() => setupListeners(store.dispatch), [store.dispatch])

  return <Provider store={store}>{children}</Provider>
}
