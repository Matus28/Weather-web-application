import { getUsername } from '../getUsername'

describe('getUsername function test', () => {
  test('returns empty string if input is empty', () => {
    expect(getUsername('')).toBe('')
  })

  test('returns empty string if inserted string is not email', () => {
    expect(getUsername('user007gmail.com')).toBe('')
  })

  test('returns user007 from inserted email', () => {
    expect(getUsername('user007@gmail.com')).toBe('user007')
  })
})
