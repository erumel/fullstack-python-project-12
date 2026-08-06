import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'

function App() {
  const token = useSelector((state) => state.auth.token)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? <HomePage /> : <Navigate to="/login" replace />
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