import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { signupUser, clearError } from '../features/auth/authSlice'
import signupImage from '../assets/image.png'

const SignupPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, loading, error, errorCode } = useSelector(state => state.auth)

  const [passwordError, setPasswordError] = useState(false)

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
    if (token) navigate('/', { replace: true })
  }, [token, navigate])

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 2000 })
      if (errorCode === 'NETWORK_ERROR') {
        dispatch(clearError())
      }
      else {
        const timer = setTimeout(() => dispatch(clearError()), 2400)
        return () => clearTimeout(timer)
      }
    }
  }, [error, errorCode, dispatch])

  useEffect(() => {
    if (passwordError) {
      toast.error(t('signup.errors.passwordsMatch'), { autoClose: 2000 })
      const timer = setTimeout(() => setPasswordError(false), 2400)
      return () => clearTimeout(timer)
    }
  }, [passwordError, t])

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '700px' }}>
        <Row className="g-0">
          <Col md={5}>
            <img src={signupImage} alt="Signup" className="img-fluid h-100" style={{ objectFit: 'cover' }} />
          </Col>
          <Col md={7}>
            <Card.Body>
              <h1 className="text-center mb-4">{t('signup.title')}</h1>

              <Formik
                initialValues={{ username: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  if (values.password !== values.confirmPassword) {
                    setPasswordError(true)
                    return
                  }
                  dispatch(signupUser({ username: values.username, password: values.password }))
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="username" className="visually-hidden">{t('signup.username')}</label>
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        placeholder={t('signup.username')}
                        aria-label={t('signup.username')}
                        autoComplete="username"
                        className={`form-control ${(errors.username && touched.username) || (error && errorCode === 'USER_EXISTS') ? 'is-invalid' : ''}`}
                      />
                      {errors.username && touched.username && (
                        <div className="text-danger small mt-1">{errors.username}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="visually-hidden">{t('signup.password')}</label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder={t('signup.password')}
                        aria-label={t('signup.password')}
                        autoComplete="new-password"
                        className={`form-control ${(errors.password && touched.password) || passwordError ? 'is-invalid' : ''}`}
                      />
                      {errors.password && touched.password && (
                        <div className="text-danger small mt-1">{errors.password}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="visually-hidden">{t('signup.confirmPassword')}</label>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder={t('signup.confirmPassword')}
                        aria-label={t('signup.confirmPassword')}
                        autoComplete="new-password"
                        className={`form-control ${(errors.confirmPassword && touched.confirmPassword) || passwordError ? 'is-invalid' : ''}`}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="text-danger small mt-1">{errors.confirmPassword}</div>
                      )}
                    </div>

                    <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                      {loading ? t('signup.loading') : t('signup.submit')}
                    </Button>
                  </Form>
                )}
              </Formik>

              <p className="text-center mt-3">
                {t('signup.hasAccount')}
                {' '}
                <Link to="/login">{t('signup.loginLink')}</Link>
              </p>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default SignupPage
