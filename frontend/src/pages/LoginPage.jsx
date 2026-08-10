import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Container, Card, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { loginUser, clearError } from '../features/auth/authSlice'
import loginImage from '../assets/image.png'

const LoginPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, loading, error } = useSelector(state => state.auth)

  useEffect(() => {
    if (token) navigate('/', { replace: true })
  }, [token, navigate])

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 2000 })
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 2400)
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '700px' }}>
        <Row className="g-0">
          <Col md={5}>
            <img src={loginImage} alt="Login" className="img-fluid h-100" style={{ objectFit: 'cover' }} />
          </Col>
          <Col md={7}>
            <Card.Body>
              <h1 className="text-center mb-4">{t('login.title')}</h1>

              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={values => dispatch(loginUser(values))}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="username" className="visually-hidden">{t('login.username')}</label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      placeholder={t('login.username')}
                      aria-label={t('login.username')}
                      autoComplete="username"
                      required
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="visually-hidden">{t('login.password')}</label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t('login.password')}
                      aria-label={t('login.password')}
                      autoComplete="current-password"
                      required
                      className={`form-control ${error ? 'is-invalid' : ''}`}
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-100" disabled={loading}>
                    {loading ? t('login.loading') : t('login.submit')}
                  </Button>
                </Form>
              </Formik>

              <p className="text-center mt-3">
                {t('login.noAccount')}
                {' '}
                <Link to="/signup">{t('login.signupLink')}</Link>
              </p>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  )
}

export default LoginPage
