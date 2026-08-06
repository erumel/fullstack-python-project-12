import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { signupUser } from '../features/auth/authSlice'

const SignupPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, loading, error } = useSelector(state => state.auth)

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, t('signup.errors.usernameLength'))
      .max(20, t('signup.errors.usernameLength'))
      .required(t('signup.errors.required')),
    password: yup
      .string()
      .min(6, t('signup.errors.passwordLength'))
      .required(t('signup.errors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('signup.errors.passwordsMatch'))
      .required(t('signup.errors.required')),
  })

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true })
    }
  }, [token, navigate])

  const handleSubmit = (values) => {
    dispatch(signupUser({ username: values.username, password: values.password }))
  }

  return (
    <div className="signup-page">
      <h1>{t('signup.title')}</h1>
      {error && <div className="error">{error}</div>}
      <Formik
        initialValues={{ username: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <Field
                name="username"
                type="text"
                placeholder={t('signup.username')}
                aria-label={t('signup.username')}
                autoComplete="username"
              />
              {errors.username && touched.username && (
                <div className="field-error">{errors.username}</div>
              )}
            </div>
            <div>
              <Field
                name="password"
                type="password"
                placeholder={t('signup.password')}
                aria-label={t('signup.password')}
                autoComplete="new-password"
              />
              {errors.password && touched.password && (
                <div className="field-error">{errors.password}</div>
              )}
            </div>
            <div>
              <Field
                name="confirmPassword"
                type="password"
                placeholder={t('signup.confirmPassword')}
                aria-label={t('signup.confirmPassword')}
                autoComplete="new-password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="field-error">{errors.confirmPassword}</div>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? t('signup.loading') : t('signup.submit')}
            </button>
          </Form>
        )}
      </Formik>
      <p>
        {t('signup.hasAccount')}
        {' '}
        <Link to="/login">{t('signup.loginLink')}</Link>
      </p>
    </div>
  )
}

export default SignupPage
