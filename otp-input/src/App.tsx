import { useCallback, useState } from 'react'
import { OtpInput } from './components/OtpInput'
import './App.css'

// What for: fake API — succeeds only for a known demo code.
async function validateOtp(code: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (code !== '123456') {
    throw new Error('Invalid verification code')
  }
}

function App() {
  // What for: async validation UI states after the 6 digits are complete.
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  // What for: useCallback keeps onComplete stable so OtpInput's effect doesn't re-fire randomly.
  const handleComplete = useCallback(async (code: string) => {
    try {
      setStatus('loading')
      setMessage(null)
      await validateOtp(code)
      setStatus('success')
      setMessage('Code verified successfully')
    } catch (err) {
      setStatus('error')
      const text = err instanceof Error ? err.message : 'Something went wrong'
      setMessage(text)
    }
  }, [])

  return (
    <main className="app">
      <h1>Verify your account</h1>
      <p className="hint">Enter the 6-digit code. Demo success code: 123456</p>

      <OtpInput onComplete={handleComplete} disabled={status === 'loading'} />

      {status === 'loading' && <p className="status">Validating...</p>}
      {message && (
        <p className={status === 'success' ? 'status ok' : 'status error'} role="status">
          {message}
        </p>
      )}
    </main>
  )
}

export default App
