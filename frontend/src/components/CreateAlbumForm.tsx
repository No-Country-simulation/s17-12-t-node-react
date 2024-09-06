"use client"
import Image from "next/image"
import { useFormState } from "react-dom"
import { SubmitButton } from "./SubmitButton"
import SelectMap from "./SelectMap"
import { useState } from "react"
import { uploadSingleImage } from "@/services/uploadImageService"
import ImagesIcon from '/public/images/logo_images.svg'
import { createAlbumAction } from "@/actions/albumActions"
import { Country, PhotoFromAlbum } from "@/interfaces/album"
import { TagsInput } from "./TagsInput"
import ImageDescription from "./ImageInput"


const INITIAL_STATE = {
  data: null,
}

export default function CreateAlbumForm() {
  const [markerCoordinates, setMarkerCoordinates] = useState<Country | null>(null)
  const [albumImages, setAlbumImages] = useState<PhotoFromAlbum[]>([])
  const [tags, setTags] = useState<string[]>([])
  /* const [confirmSend, setConfirmSend] = useState<boolean>(false) */
  //cambiar por una cookie
  const token = localStorage.getItem('token')
  const createAlbumComplete = createAlbumAction.bind(null, albumImages, markerCoordinates, tags, token)
  const [formState, formAction] = useFormState(
    createAlbumComplete,
    INITIAL_STATE
  )

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files!
    console.log(files)

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const image = await uploadSingleImage(files[i])
        const photo = {
          url: image,
          description: ''
        }
        setAlbumImages((prevState) => [...prevState, photo])
      }
    }
  }

  //Aca hay que cambiar la logica para que pueda borrar imagenes si se arrepintio de subir alguna imagen
  //cuando se hace la peticion a uploadImage hay que hacer que devuelva un objeto con el delete_token
  const deleteImage = (url: string) => {
    const newAlbumImages = albumImages.filter((item) => item.url !== url)
    setAlbumImages(newAlbumImages)
  }

  const saveImageDescription = (url: string, description: string) => {
    setAlbumImages((prevState) =>
      prevState.map((image) =>
        image.url === url ? { ...image, description } : image
      )
    )
  }

  return (
    <form action={formAction} className="flex flex-col gap-6 mt-24 px-4">

      <div className="flex items-end justify-between">
        <label htmlFor="title">Titulo</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="string"
          id="title"
          name="title"
          required
        />

      </div>
      {formState?.errors?.title && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.title}</p>}

      <TagsInput tags={tags} setTags={setTags} />
      {formState?.errors?.tags && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.tags}</p>}

      <SelectMap markerCoordinates={markerCoordinates} setMarkerCoordinates={setMarkerCoordinates} />

      <div className="flex items-end justify-between">
        <label htmlFor="description">Describe tu viaje</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="text"
          id="description"
          name="description"
          required
        />
      </div>
      {formState?.errors?.description && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.description}</p>}

      <div className="w-full flex justify-center">
        <label htmlFor="doc" className="relative flex flex-col items-center p-4 w-[296px] h-24 rounded-3xl border border-gray-400 border-dashed bg-gray-100 cursor-pointer">
          <Image className="h-9 w-auto" width={360} height={360} src={ImagesIcon} alt="image icon" />
          <h4 className="text-xl font-medium text-gray-700">Subir Imágenes</h4>
          <input
            type='file'
            name='albumImages'
            multiple
            onChange={handleFileChange}
            accept="png, jpg"
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>
      {albumImages && (
        <div className="flex gap-2 relative">
          {albumImages.map((item) => (
            <div key={item.url} className="flex flex-col gap-2 w-32">
              <div className="w-32 h-32 relative">
                <Image
                  width={128}
                  height={128}
                  className='w-32 h-32 rounded-xl'
                  src={item.url}
                  alt='Profile Image uploaded'
                />
                <button
                  onClick={() => deleteImage(item.url)}
                  className="absolute -top-2 -right-2 bg-red-600 rounded-full w-6 h-6"
                >X</button>
              </div>
              {item.description && (
                <span>{item.description}</span>
              )}
              <ImageDescription url={item.url} descriptionPhoto="" saveDescription={saveImageDescription} />
            </div>

          ))}
        </div>
      )}

      {/* tengo que cambiar esto por la vista de album individual */}
      {/* {confirmSend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Vista Previa del Álbum</h2>
            <p><strong>Título:</strong> {formState.title}</p>
            <p><strong>Descripción:</strong> {formState.description}</p>
            <p><strong>Tags:</strong> {tags.join(", ")}</p>
            <p><strong>Coordenadas:</strong> {markerCoordinates ? `${markerCoordinates.latitude}, ${markerCoordinates.longitude}` : "No seleccionadas"}</p>
            <p><strong>Lugar:</strong> {markerCoordinates?.description}</p>
            <div>
              <strong>Imágenes:</strong>
              {albumImages.map((image) => (
                <div key={image.url} className="my-2">
                  <Image src={image.url} alt="Uploaded image" width={100} height={100} className="rounded-md" />
                  <p>{image.description}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setConfirmSend(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Cerrar
            </button>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Confirmar
            </button>
          </div>
        </div>
      )} */}

      <SubmitButton className="text-xl bg-slate-400 rounded h-12 mx-4 mb-4 text-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.15)]" loadingText="Cargando..." text="Guardar" />
      {formState?.createAlbumError && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.message}: {formState?.createAlbumError}</p>}
      {formState?.success && <p className="-mt-4 mx-4 text-end text-green-500 text-xs">{formState?.success}</p>}
    </form>
  )
}