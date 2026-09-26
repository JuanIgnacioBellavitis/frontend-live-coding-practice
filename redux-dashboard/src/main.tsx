import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './store'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* What for: Provider makes the store available to every component. */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
