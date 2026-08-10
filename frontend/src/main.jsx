import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider, ErrorBoundary } from '@rollbar/react'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from './app/store'
import App from './App'
import './i18n'
import 'bootstrap/dist/css/bootstrap.min.css'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE || 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

const FallbackUI = () => {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '20px', color: 'red' }}>
      <h2>{t('errors.fallback.title')}</h2>
      <p>{t('errors.fallback.message')}</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider config={rollbarConfig}>
      <ErrorBoundary fallbackUI={FallbackUI}>
        <ReduxProvider store={store}>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </ReduxProvider>
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
