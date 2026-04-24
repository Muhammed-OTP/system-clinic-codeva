import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { setLang } from '@/store/uiSlice'
import App from './App'
import '@/styles/index.css'

// Sync <html dir/lang> with persisted Redux state before first paint
store.dispatch(setLang(store.getState().ui.lang))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
