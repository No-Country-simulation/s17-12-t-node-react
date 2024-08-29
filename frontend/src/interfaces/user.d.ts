export interface User {
  _id: string
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
  country: string
  tags: string[]
  isAdmin: boolean
  description: string
  imageUrl: string
}

export interface RegisterUser {
  email: string
  password: string
  isAdmin: boolean
}

export interface InitialUser {
  _id: string
  username: string
  email: string
  password: string
  tags: string[]
  isAdmin: boolean
}
