import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const token = useSelector(state => state.auth.token)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={token ? <HomePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/" replace /> : <SignupPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
