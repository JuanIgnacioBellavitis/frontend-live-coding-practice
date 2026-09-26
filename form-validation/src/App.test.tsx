import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Register form', () => {
  it('shows validation errors when submitting empty fields', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(screen.getByText(/name is required/i)).toBeTruthy()
    expect(screen.getByText(/email is required/i)).toBeTruthy()
  })

  it('shows success message after a valid submit', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/name/i), 'Ada')
    await user.type(screen.getByLabelText(/^email$/i), 'ada@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'password1')
    await user.type(screen.getByLabelText(/confirm password/i), 'password1')
    await user.click(screen.getByRole('button', { name: /create account/i }))

    expect(
      await screen.findByText(/welcome, ada! account created/i),
    ).toBeTruthy()
  })
})
