export type RegisterFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormValues, string>>
