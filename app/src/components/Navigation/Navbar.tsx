import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

import './Navbar.css'
import { useTitleContext } from '../../context/TitleContext'

const Navbar = (): JSX.Element => {
  const { logout } = useLogout()
  const { state } = useAuthContext()

  const contextTitle = useTitleContext()

  const handleClick = (): void => {
    logout()
  }

  return (
    <header>
      <div className='container'>
        <div className='controls'>
          <div className='tabs'>
            <Link className={contextTitle?.title === 'Home' ? 'active' : ''} to='/'>
              <h2>Home</h2>
            </Link>
            {state.user && (
              <Link className={contextTitle?.title === 'Cities' ? 'active' : ''} to='/cities'>
                <h2>Cities</h2>
              </Link>
            )}
          </div>
          <nav>
            {!state.user && (
              <div className='authentication'>
                <Link to='/login'>
                  <h3>Login</h3>
                </Link>
                <Link to='/signup'>
                  <h3>Signup</h3>
                </Link>
              </div>
            )}

            {state.user && (
              <div className='authentication'>
                <span>{state.user.email}</span>
                <Link to='/' onClick={handleClick}>
                  <h3>Log out</h3>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
