import { LoginUser } from '@/interfaces/user'

interface RegisterUserProps {
  password: string
  email: string
}

const BASE_URL = process.env.API_URL

export async function registerUserService(userData: RegisterUserProps) {
  const url = BASE_URL + '/user'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Registration Service Error:', error)
  }
}

export async function loginUserService(userData: LoginUser) {
  const url = BASE_URL + '/auth/credentials'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache',
    })

    return response.json()
  } catch (error) {
    console.error('Login Service Error:', error)
  }
}
