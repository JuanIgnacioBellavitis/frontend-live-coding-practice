import { describe, expect, it } from 'vitest'
import { validateRegisterForm } from './validateRegisterForm'

describe('validateRegisterForm', () => {
  it('returns errors for empty values', () => {
    const errors = validateRegisterForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })

    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.password).toBeTruthy()
    expect(errors.confirmPassword).toBeTruthy()
  })

  it('requires matching passwords', () => {
    const errors = validateRegisterForm({
      name: 'Ada',
      email: 'ada@example.com',
      password: 'password1',
      confirmPassword: 'password2',
    })

    expect(errors.confirmPassword).toBe('Passwords do not match')
  })

  it('returns no errors for a valid form', () => {
    const errors = validateRegisterForm({
      name: 'Ada',
      email: 'ada@example.com',
      password: 'password1',
      confirmPassword: 'password1',
    })

    expect(errors).toEqual({})
  })
})
