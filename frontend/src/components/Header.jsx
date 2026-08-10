import { Navbar, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { logout } from '../features/auth/authSlice'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  return (
    <Navbar bg="light" className="border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('header.title')}</Navbar.Brand>
        <div className="ms-auto">
          {token && (
            <Button variant="outline-primary" size="sm" onClick={() => dispatch(logout())} className="fs-6">
              {t('header.logout')}
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
