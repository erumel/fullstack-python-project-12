import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const token = useSelector((state) => state.auth.token)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? <h1>Чат</h1> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App