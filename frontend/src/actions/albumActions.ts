'use server'
import {
  AlbumFromFetch,
  CountryWithoutDescription,
  PhotoFromAlbum,
} from '@/interfaces/album'
import { createAlbumService, postCommentService } from '@/services/albumService'
import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import { z } from 'zod'
const BASE_URL = process.env.API_URL

const schemaComment = z.object({
  comment: z.string().min(1, 'El comentario no puede estar vacío.'),
})

export async function createAlbumAction(
  albumImages: PhotoFromAlbum[],
  markerCoordinates: CountryWithoutDescription | null,
  tags: string[],
  token: string | null,
  description: string,
  prevState: any,
  formData: FormData
) {
  const title = formData.get('title') as string
  const fields = {
    title: title,
    description: description,
    location: {
      /*       description: markerCoordinates?.description, */
      latitude: markerCoordinates?.latitude as number,
      longitude: markerCoordinates?.longitude as number,
    },
    photos: albumImages,
    tags: tags,
  }

  console.log(fields)
  const responseData = await createAlbumService(token, fields)
  console.log(responseData)

  if (!responseData) {
    return {
      ...prevState,
      errors: {},
      createAlbumError: null,
      message: 'Ops! Something went wrong. Please try again',
    }
  }

  if (responseData.message) {
    return {
      ...prevState,
      errors: {},
      createAlbumError: responseData.message,
      message: 'Failed to Post Album',
    }
  }
  return { ...prevState, success: 'Creado con exito' }
}

export async function updateAlbumAction(
  albumImages: PhotoFromAlbum[],
  markerCoordinates: CountryWithoutDescription | null,
  tags: string[],
  prevState: any,
  formData: FormData
) {
  console.log(albumImages)
  console.log(markerCoordinates)
  console.log(formData)
  const description = formData.get('description') as string
  const fields = {
    title: 'Viaje',
    description: description,
    location: {
      latitude: markerCoordinates?.latitude,
      longitude: markerCoordinates?.longitude,
    },
    photos: albumImages,
    tags: tags,
  }
  console.log(fields)
  return { ...prevState }
}

export async function getAlbumsByTag(tag: string) {
  const url = BASE_URL + '/album/search?q=' + tag
  const data = await fetch(url)
  const results: AlbumFromFetch[] = await data.json()

  if (results) {
    return results
  }

  return []
}

export const getAlbumById = async (id: string): Promise<AlbumFromFetch> => {
  const url = BASE_URL + `/album/${id}`
  const data = await fetch(url)
  const results: AlbumFromFetch = await data.json()

  if (!results) {
    redirect(notFound())
  }

  revalidatePath(url)
  return results
}

export const getAlbumByUser = async (id: string) => {
  const url = BASE_URL + `/album/user/${id}`
  const data = await fetch(url)
  const results: AlbumFromFetch[] = await data.json()

  if (!results) {
    redirect(notFound())
  }

  revalidatePath(url)
  return results
}

export async function postCommentAction(
  albumId: string,
  token: string | null,
  prevState: any,
  formData: FormData
) {
  const commentFromForm = formData.get('comment') as string
  console.log('albumId', albumId)
  console.log('token', token)
  console.log('Comment', commentFromForm)

  const validatedFields = schemaComment.safeParse({
    comment: commentFromForm,
  })

  if (!validatedFields.success) {
    console.log('paso por !validatedFields.success')
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al enviar comentario.',
    }
  }

  const body = {
    content: commentFromForm,
    albumId: albumId,
  }

  const responseData = await postCommentService(body, token)

  if (!responseData) {
    return {
      ...prevState,
      errors: {},
      message:
        'Algo salió mal. Error al enviar el comentario:' +
        responseData!.statusText,
    }
  }

  if (!responseData.ok) {
    return {
      ...prevState,
      errors: {},
      message: 'Error al enviar el comentario: ' + responseData.statusText,
    }
  }

  return {
    ...prevState,
    success: 'Comentario enviado exitosamente',
    comments: [...prevState.comments, body],
  }
}
