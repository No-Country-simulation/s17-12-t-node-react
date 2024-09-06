'use server'
import { CountryWithoutDescription, PhotoFromAlbum } from '@/interfaces/album'
import { createAlbumService } from '@/services/albumService'

export async function createAlbumAction(
  albumImages: PhotoFromAlbum[],
  markerCoordinates: CountryWithoutDescription | null,
  tags: string[],
  token: string | null,
  prevState: any,
  formData: FormData
) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  console.log(token)
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
