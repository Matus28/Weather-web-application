import { ControlledSwitch } from '../Switch/ControlledSwitch'
import { fireEvent, render } from '@testing-library/react'

describe('ControlledSwitch component test', () => {
  const handleSwitch = jest.fn()

  test('returns input switch element (checkbox) which is not checked', () => {
    const { container } = render(<ControlledSwitch isChecked={false} onCheck={handleSwitch} />)
    const input = container.getElementsByTagName('input')[0] as HTMLInputElement
    expect(input).toBeDefined()
    expect(input.type).toBe('checkbox')
    expect(input.checked).toBeFalsy()
  })

  test('calls handleSwitch function one time', () => {
    const { container } = render(<ControlledSwitch isChecked={false} onCheck={handleSwitch} />)
    const input = container.getElementsByTagName('input')[0] as HTMLInputElement
    fireEvent.click(input)
    expect(handleSwitch).toHaveBeenCalledTimes(1)
  })

  test('returns element with checked input switch', () => {
    const { container } = render(<ControlledSwitch isChecked={true} onCheck={handleSwitch} />)
    const input = container.getElementsByTagName('input')[0] as HTMLInputElement
    expect(input.checked).toBeTruthy()
  })
})
