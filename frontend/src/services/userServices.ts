import { InitialUser } from '@/interfaces/user'

const BASE_URL = process.env.API_URL

export async function patchUserService(id: string, userData: InitialUser) {
  const url = BASE_URL + '/user/' + id

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...userData }),
      cache: 'no-cache'
    })

    return response.json()
  } catch (error) {
    console.error('Update User Service Error:', error)
  }
}
