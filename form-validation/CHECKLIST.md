# Form Validation — Live Coding Checklist

Use this while practicing. Speak in **English**. Build **one step at a time**.

Time target: **45–60 min** for steps 1–7. Tests only if time left.

---

## Before coding (20–30 seconds)

> I'll build a registration form with controlled inputs, client-side validation, disable the button while submitting, and show success or error. Validation will be a pure function so it's easy to test.

---

## Step-by-step build order

### 1. Static form shell
- [ ] Fields: name, email, password, confirm password + submit
- [ ] **Say:** "I'll sketch the form first, then wire state and validation."

### 2. Types
- [ ] `RegisterFormValues` + `RegisterFormErrors`
- [ ] **Say:** "Types keep the form shape explicit."

### 3. Controlled inputs
- [ ] One `values` object in `useState`
- [ ] Shared `onChange` using `event.target.name`
- [ ] **Say:** "One form state object scales better than four separate states."

### 4. Validation function (pure)
- [ ] Required fields, email format, password min length, passwords match
- [ ] **Say:** "Pure function — no React — so I can unit test it easily."

### 5. Validate on submit
- [ ] `preventDefault`
- [ ] Run validator → set `errors`
- [ ] Return early if errors exist
- [ ] **Say:** "I validate before calling any API."

### 6. Accessibility basics
- [ ] `<label htmlFor>` matching input `id`
- [ ] `aria-invalid` + `aria-describedby` when there's an error
- [ ] `role="alert"` on error messages
- [ ] **Say:** "Labels and aria hooks keep the form usable with assistive tech."

### 7. Async submit
- [ ] `submitting` state → disable button / change label
- [ ] Fake `await` or real POST
- [ ] Success message + reset form; catch → submit error
- [ ] **Say:** "Disable while submitting to avoid double posts."

### 8. Clear field error while typing (nice UX)
- [ ] On change, clear that field's error
- [ ] **Say:** "Clearing stale errors improves feedback without revalidating everything."

### 9. Tests (only if time left)
- [ ] Unit test the validator
- [ ] RTL: empty submit shows errors; valid submit shows success
- [ ] **Say:** "I test behavior users see, not internal state."

---

## Quick answers

| Question | Short answer |
|----------|----------------|
| Why one `values` object? | Easier to extend; one change handler. |
| Why pure `validate`? | Testable without mounting React. |
| Validate on change or submit? | Submit first in live coding; on blur/change if time. |
| Why `noValidate`? | We own JS validation; avoid browser popups fighting our UI. |
| Redux for this form? | No — local form state. |
| react-hook-form? | Fine in production; in live coding vanilla is clearer unless they ask. |

---

## Practice modes

1. **No timer** — full form + a11y + fake submit.
2. **60 min** — steps 1–7 from scratch in English.
3. **45 min** — same; skip tests.
4. **Talk track** — explain Redux/Next/RTL using `../WIZELINE-CHEATSHEET.md` without coding them.
