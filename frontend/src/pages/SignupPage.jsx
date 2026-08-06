import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { signupUser, clearError } from '../features/auth/authSlice'

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Обязательное поле'),
})

const SignupPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, loading, error } = useSelector((state) => state.auth)

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
      <h1>Регистрация</h1>
      {error && <div className="error">{typeof error === 'string' ? error : error.message}</div>}
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
                placeholder="Имя пользователя"
                aria-label="Имя пользователя"
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
                placeholder="Пароль"
                aria-label="Пароль"
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
                placeholder="Подтверждение пароля"
                aria-label="Подтверждение пароля"
                autoComplete="new-password"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="field-error">{errors.confirmPassword}</div>
              )}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </Form>
        )}
      </Formik>
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  )
}

export default SignupPage