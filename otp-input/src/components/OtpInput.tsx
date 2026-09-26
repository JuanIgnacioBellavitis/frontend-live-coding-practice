import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react'
import './OtpInput.css'

const OTP_LENGTH = 6

type OtpInputProps = {
  // What for: parent simulates the validation API when all digits are filled.
  onComplete: (code: string) => void
  disabled?: boolean
}

export function OtpInput({ onComplete, disabled = false }: OtpInputProps) {
  // What for: one character per box — easier focus/index handling than a single string alone.
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  // What for: refs so we can programmatically focus the next/previous input.
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  // What for: avoid calling onComplete twice for the same completed code.
  const lastSubmittedRef = useRef<string | null>(null)

  const code = digits.join('')

  useEffect(() => {
    if (code.length === OTP_LENGTH && /^\d{6}$/.test(code)) {
      if (lastSubmittedRef.current === code) {
        return
      }
      lastSubmittedRef.current = code
      onComplete(code)
    }
  }, [code, onComplete])

  function focusIndex(index: number) {
    const input = inputsRef.current[index]
    input?.focus()
    input?.select()
  }

  function updateDigit(index: number, value: string) {
    // What for: only keep the last typed digit — blocks multi-char paste into one box.
    const digit = value.replace(/\D/g, '').slice(-1)

    setDigits((current) => {
      const next = [...current]
      next[index] = digit
      return next
    })

    if (digit && index < OTP_LENGTH - 1) {
      focusIndex(index + 1)
    }
  }

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    updateDigit(index, event.target.value)
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    // What for: Backspace on an empty box moves focus to the previous digit.
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault()
      setDigits((current) => {
        const next = [...current]
        next[index - 1] = ''
        return next
      })
      lastSubmittedRef.current = null
      focusIndex(index - 1)
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)

    if (!pasted) {
      return
    }

    // What for: paste "123456" fills all boxes at once — common OTP UX.
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((char, index) => {
      next[index] = char
    })
    setDigits(next)
    lastSubmittedRef.current = null
    focusIndex(Math.min(pasted.length, OTP_LENGTH) - 1)
  }

  return (
    <div className="otp" role="group" aria-label="One-time password">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element
          }}
          className="otp-box"
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
        />
      ))}
    </div>
  )
}
