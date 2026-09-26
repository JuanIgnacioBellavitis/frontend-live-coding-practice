# OTP Input — Live Coding Checklist

Speak in **English**. Time target: **30–45 min**.

---

## Before coding

> I'll build six single-digit inputs. Typing moves focus forward. When all six digits are filled, I'll call a mock validation API. I'll also handle Backspace and paste if we have time.

---

## Step-by-step

### 1. UI shell
- [ ] Six `<input maxLength={1}>` in a row
- [ ] `inputMode="numeric"`
- [ ] **Say:** "One box per digit keeps focus management simple."

### 2. State
- [ ] `digits: string[]` length 6
- [ ] Controlled `value={digits[i]}`
- [ ] **Say:** "Array state maps cleanly to each input index."

### 3. Auto-focus next
- [ ] `useRef` array of inputs
- [ ] On digit entered → `focus()` next index
- [ ] **Say:** "Refs let me focus without storing focus index in state."

### 4. Complete → API
- [ ] When `digits.join('')` is 6 digits → `onComplete(code)`
- [ ] Parent: loading / success / error
- [ ] Guard against double submit for the same code
- [ ] **Say:** "I trigger validation automatically when the code is complete."

### 5. Backspace (expected follow-up)
- [ ] Empty box + Backspace → clear previous + focus previous

### 6. Paste (nice mid signal)
- [ ] `onPaste` → fill all boxes from clipboard digits

### 7. a11y
- [ ] `aria-label` per digit / group label
- [ ] `autoComplete="one-time-code"` on first input (mobile OTP)

---

## Interview answers

| Question | Short answer |
|----------|----------------|
| Why array not one string? | Easier per-index focus and controlled inputs. |
| Why refs? | Imperative focus — not worth encoding in React state. |
| Why useCallback on onComplete? | Stable callback avoids effect re-running. |
| Only digits? | Strip with `\D` / `inputMode="numeric"`. |

---

## Practice

1. Build without paste first (core requirements).
2. Add Backspace, then paste.
3. Explain the flow out loud while coding.
