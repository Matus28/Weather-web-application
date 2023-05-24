import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import MenuAppBar from '../Navigation/MenuAppBar'
import { BrowserRouter } from 'react-router-dom'
import { TitleProvider } from '../../context/TitleContext'
import { AuthContextProvider } from '../../context/AuthContext'
import { useAuthContext } from '../../hooks/useAuthContext'

jest.mock('../../context/TitleContext', () => {
  const mockedSetTitle = jest.fn()
  const originalModule = jest.requireActual('../../context/TitleContext')
  return {
    __esModule: true,
    ...originalModule,
    useTitleContext: jest.fn().mockReturnValue({ title: 'TestPage', setTitle: mockedSetTitle }),
  }
})

jest.mock('../../hooks/useAuthContext', () => {
  const originalModule = jest.requireActual('../../hooks/useAuthContext')
  return {
    __esModule: true,
    ...originalModule,
    useAuthContext: jest.fn(),
  }
})

afterEach(cleanup)

describe('MenuAppBar component test', () => {
  beforeEach(() => {
    ;(useAuthContext as jest.Mock).mockReset()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('returns div element with the name of the actual page (TestPage)', () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({
      state: { user: null },
    })
    const { container } = render(
      <BrowserRouter>
        <AuthContextProvider>
          <TitleProvider>
            <MenuAppBar />
          </TitleProvider>
        </AuthContextProvider>
      </BrowserRouter>,
    )

    const title = container.getElementsByClassName('MuiTypography-h6')[0]
    expect(title).toBeDefined()
    expect(title.textContent).toBe('TestPage')
  })

  test('return user button element for user actions with options if user is not loged in', async () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({
      state: { user: null },
    })
    const { container } = render(
      <BrowserRouter>
        <AuthContextProvider>
          <TitleProvider>
            <MenuAppBar />
          </TitleProvider>
        </AuthContextProvider>
      </BrowserRouter>,
    )

    const divUserButton = container.getElementsByClassName('user-button')[0]
    const button = divUserButton.firstElementChild as HTMLButtonElement
    expect(divUserButton).toBeDefined()
    expect(button).toBeDefined()

    fireEvent.click(button)

    await waitFor(() => {
      const paperLogin = screen.getByText('Login')
      const paperSignup = screen.getByText('Signup')
      expect(paperLogin).toBeDefined()
      expect(paperSignup).toBeDefined()
    })
  })

  test('return user button element for user actions with options if user is loged in', async () => {
    ;(useAuthContext as jest.Mock).mockReturnValue({
      state: { user: { email: 'test@gmail.com', token: 'testtoken' } },
    })
    const { container } = render(
      <BrowserRouter>
        <AuthContextProvider>
          <TitleProvider>
            <MenuAppBar />
          </TitleProvider>
        </AuthContextProvider>
      </BrowserRouter>,
    )

    const divUserButton = container.getElementsByClassName('user-button')[0]
    const button = divUserButton.lastElementChild as HTMLButtonElement
    expect(divUserButton).toBeDefined()
    expect(button).toBeDefined()

    fireEvent.click(button)

    await waitFor(() => {
      const paperLogout = screen.getByText('Logout')
      expect(paperLogout).toBeDefined()
    })
  })
})
