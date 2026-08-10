import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
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
                onSubmit={(values) => {
                  if (values.password !== values.confirmPassword) {
                    setPasswordError(true)
                    return
                  }
                  dispatch(signupUser({ username: values.username, password: values.password }))
                }}
              >
                <Form>
                  <div className="mb-3">
                    <Field
                      name="username"
                      type="text"
                      placeholder={t('signup.username')}
                      autoComplete="username"
                      required
                      minLength={3}
                      maxLength={20}
                      className={`form-control ${error && errorCode === 'USER_EXISTS' ? 'is-invalid' : ''}`}
                    />
                  </div>

                  <div className="mb-3">
                    <Field
                      name="password"
                      type="password"
                      placeholder={t('signup.password')}
                      autoComplete="new-password"
                      required
                      minLength={6}
                      className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    />
                  </div>

                  <div className="mb-3">
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder={t('signup.confirmPassword')}
                      autoComplete="new-password"
                      required
                      minLength={6}
                      className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                    {loading ? t('signup.loading') : t('signup.submit')}
                  </Button>
                </Form>
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
