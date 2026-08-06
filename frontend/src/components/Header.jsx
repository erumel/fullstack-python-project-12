import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  return (
    <header className="app-header">
      <Link to="/">Hexlet Chat</Link>
      {token && (
        <button type="button" onClick={() => dispatch(logout())}>
          Выйти
        </button>
      )}
    </header>
  )
}

export default Header