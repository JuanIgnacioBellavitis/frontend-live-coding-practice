// English: Explicit User type so TypeScript catches typos and missing fields from the API.
export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    city: string
  }
  company: {
    name: string
  }
}
