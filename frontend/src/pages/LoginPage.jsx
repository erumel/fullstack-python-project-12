import { Formik, Form, Field } from 'formik'

const LoginPage = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className="login-page">
      <h1>Войти</h1>
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
          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginPage
