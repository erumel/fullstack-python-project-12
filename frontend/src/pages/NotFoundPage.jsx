import { Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <Container className="text-center mt-5">
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.message')}</p>
    </Container>
  )
}

export default NotFoundPage
