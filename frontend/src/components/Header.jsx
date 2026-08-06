import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { logout } from '../features/auth/authSlice'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)

  return (
    <header className="app-header">
      <Link to="/">{t('header.title')}</Link>
      {token && (
        <button type="button" onClick={() => dispatch(logout())}>
          {t('header.logout')}
        </button>
      )}
    </header>
  )
}

export default Header
