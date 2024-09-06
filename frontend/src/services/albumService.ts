'use server'
import { Album } from '@/interfaces/album'

const BASE_URL = process.env.API_URL

export async function createAlbumService(
  token: string | null,
  albumData: Album
) {
  const url = BASE_URL + '/album'
  console.log(url)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...albumData }),
      cache: 'no-cache',
    })
    console.log(response)

    return response.json()
  } catch (error) {
    console.error('Error en la respuesta:', error)
  }
}
