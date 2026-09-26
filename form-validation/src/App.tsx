import { useState } from 'react'
import type { RegisterFormErrors, RegisterFormValues } from './types/form'
import { validateRegisterForm } from './utils/validateRegisterForm'
import './App.css'

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function App() {
  // What for: controlled form fields (name, email, password, confirmPassword).
  const [values, setValues] = useState<RegisterFormValues>(initialValues)
  // What for: per-field validation messages after submit (or cleared while typing).
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  // What for: disable the button / show "Creating..." during the async submit.
  const [submitting, setSubmitting] = useState(false)
  // What for: show a form-level error if the submit request fails.
  const [submitError, setSubmitError] = useState<string | null>(null)
  // What for: show a success message after a valid submit.
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    // English: Controlled inputs — one object state keeps the form easy to extend.
    setValues((current) => ({ ...current, [name]: value }))
    setSuccessMessage(null)
    setSubmitError(null)

    // English: Clear that field's error while typing — better UX than leaving stale messages.
    if (errors[name as keyof RegisterFormValues]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setSuccessMessage(null)
    setSubmitError(null)

    const nextErrors = validateRegisterForm(values)
    setErrors(nextErrors)

    // English: Stop early if invalid — don't call the API with bad data.
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    try {
      setSubmitting(true)

      // English: Fake async submit — in an interview this would be fetch/axios POST.
      await new Promise((resolve) => setTimeout(resolve, 500))

      setSuccessMessage(`Welcome, ${values.name.trim()}! Account created.`)
      setValues(initialValues)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="app">
      <h1>Create account</h1>

      <form onSubmit={handleSubmit} noValidate>
        {/* English: noValidate — we own validation in JS; still keep native labels for a11y.

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" className="error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" className="error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
            autoComplete="new-password"
          />
          {errors.password && (
            <p id="password-error" className="error" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword ? 'confirmPassword-error' : undefined
            }
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="error" role="alert">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {submitError && (
          <p className="error" role="alert">
            {submitError}
          </p>
        )}

        {successMessage && (
          <p className="success" role="status">
            {successMessage}
          </p>
        )}

        <button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </main>
  )
}

export default App
