// English: Only fields shown in the table — keep the type small.
export type User = {
  id: number
  name: string
  email: string
  address: {
    city: string
  }
  company: {
    name: string
  }
}

export type SortKey = 'name' | 'email' | 'city' | 'company'
export type SortDirection = 'asc' | 'desc'
