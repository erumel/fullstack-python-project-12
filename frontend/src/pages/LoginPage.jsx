import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, clearError } from '../features/auth/authSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])

  const handleSubmit = (values) => {
    dispatch(loginUser(values))
  }

  return (
    <div className="login-page">
      <h1>Войти</h1>
      {error && <div className="error">{error}</div>}
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <Field
              name="username"
              type="text"
              placeholder="Имя пользователя"
              aria-label="Имя пользователя"
              autoComplete="username"
            />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              placeholder="Пароль"
              aria-label="Пароль"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : 'Войти'}
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginPage
