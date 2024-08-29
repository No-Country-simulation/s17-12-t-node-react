import { InitialUser, User } from '@/interfaces/user'

const BASE_URL = process.env.API_URL

//para actualizar solo los tags apenas se registra
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

//para editar los datos del perfil con la mayoria de los datos
export async function updateUserService(user: User) {
  const url = BASE_URL + '/user/' + user._id

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...user }),
      cache: 'no-cache'
    })

    return response.json()
  } catch (error) {
    console.error('Registration Service Error:', error)
  }
}
