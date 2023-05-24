import Navbar from '../Navigation/Navbar'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

jest.mock('../../hooks/useAuthContext', () => {
  const originalModule = jest.requireActual('../../hooks/useAuthContext')
  return {
    __esModule: true,
    ...originalModule,
    useAuthContext: jest.fn().mockReturnValue({
      state: { user: null },
    }),
  }
})

jest.mock('../../hooks/useLogout', () => {
  const originalModule = jest.requireActual('../../hooks/useLogout')
  return {
    __esModule: true,
    ...originalModule,
    useLogout: jest.fn().mockReturnValue({
      logout: jest.fn(),
    }),
  }
})

describe('Navbar component test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('returns link to Home page, Login, Logout - before authentication', () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({
      state: { user: null },
    })
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const headerHome = screen.getByText('Home')
    const headerSignup = screen.getByText('Signup')
    const headerLogin = screen.getByText('Login')
    expect(headerHome).toBeDefined()
    expect(headerSignup).toBeDefined()
    expect(headerLogin).toBeDefined()
  })

  test('returns link to Home page, Cities, Logout page - aftef authentication', () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({
      state: { user: { email: 'test@gmail.com', token: 'testtoken' } },
    })
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const headerHome = screen.getByText('Home')
    const headerCities = screen.getByText('Cities')
    const headerLogout = screen.getByText('Log out')
    const userEmail = screen.getByText('test@gmail.com')
    expect(headerHome).toBeDefined()
    expect(headerCities).toBeDefined()
    expect(headerLogout).toBeDefined()
    expect(userEmail).toBeDefined()
  })

  test('returns all anchors with right path', () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({
      state: { user: { email: 'test@gmail.com', token: 'testtoken' } },
    })
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const anchorList = container.getElementsByTagName('a')
    const anchorHome = anchorList[0] as HTMLAnchorElement
    const anchorCities = anchorList[1] as HTMLAnchorElement
    const anchorLogout = anchorList[2] as HTMLAnchorElement
    expect(anchorHome.href).toBe('http://localhost/')
    expect(anchorHome.firstChild?.textContent).toBe('Home')
    expect(anchorCities.href).toBe('http://localhost/cities')
    expect(anchorCities.firstChild?.textContent).toBe('Cities')
    expect(anchorLogout.href).toBe('http://localhost/')
    expect(anchorLogout.firstChild?.textContent).toBe('Log out')
  })

  test('mock function logout is called when user click on logout', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    )
    const anchorLogout = container.getElementsByTagName('a')[2]
    fireEvent.click(anchorLogout)
    expect(anchorLogout.firstChild?.textContent).toBe('Log out')
    expect(useLogout).toHaveBeenCalledTimes(1)
  })
})
