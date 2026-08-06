import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { loginUser } from '../features/auth/authSlice'

const LoginPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, loading, error } = useSelector(state => state.auth)

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
      <h1>{t('login.title')}</h1>
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
              placeholder={t('login.username')}
              aria-label={t('login.username')}
              autoComplete="username"
            />
          </div>
          <div>
            <Field
              name="password"
              type="password"
              placeholder={t('login.password')}
              aria-label={t('login.password')}
              autoComplete="current-password"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? t('login.loading') : t('login.submit')}
          </button>
        </Form>
      </Formik>
      <p>
        {t('login.noAccount')}
        {' '}
        <Link to="/signup">{t('login.signupLink')}</Link>
      </p>
    </div>
  )
}

export default LoginPage
