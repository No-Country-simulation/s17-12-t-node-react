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

    return response.json()
  } catch (error) {
    console.error('Error en la respuesta:', error)
  }
}

export const postCommentService = async (
  body: {
    content: string
    albumId: string
  },
  token: string | null
) => {
  const url = `${BASE_URL}/comment`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al enviar el comentario')
    }

    return response
  } catch (error) {
    console.error('Error en la solicitud de comentario:', error)
    return null
  }
}
