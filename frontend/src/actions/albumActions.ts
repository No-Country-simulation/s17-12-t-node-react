import { Country, PhotoFromAlbum } from '@/interfaces/album'

export async function createAlbumAction(
  albumImages: PhotoFromAlbum[],
  markerCoordinates: Country | null,
  tags: string[],
  confirmSend: boolean,
  setConfirmSend: (confirmSend: boolean) => void,
  prevState: any,
  formData: FormData
) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const fields = {
    title: title,
    description: description,
    location: {
      description: markerCoordinates?.description,
      latitude: markerCoordinates?.latitude,
      longitude: markerCoordinates?.longitude,
    },
    photos: albumImages,
    tags: tags,
  }

  if (!confirmSend) {
    setConfirmSend(true)
    return { ...prevState }
  } else {
    console.log(fields)
    return { ...prevState }
  }
}

export async function updateAlbumAction(
  albumImages: PhotoFromAlbum[],
  markerCoordinates: Country | null,
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
