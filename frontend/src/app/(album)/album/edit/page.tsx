import EditAlbumForm from "@/components/EditAlbumForm";
import { Album, Country, PhotoFromAlbum } from "@/interfaces/album";
import Link from "next/link";

const BASE_URL = process.env.API_URL

interface AlbumForEdit {
  title: string
  description: string
  location: Country
  photos: PhotoFromAlbum[]
  tags: string[]
}

const album: AlbumForEdit = {
  title: "Viaje",
  description: "Un gran y bonito lugar",
  location: {
    description: "Argentina",
    latitude: -33.69105063659446,
    longitude: -65.42170571843158
  },
  photos: [
    {
      url: "https://res.cloudinary.com/db395v0wf/image/upload/v1725482175/i0kriksmgvqw9dqxjqy2.jpg",
      description: "una linda montaña"
    },
    {
      url: "https://res.cloudinary.com/db395v0wf/image/upload/v1725482176/asvdgbpkg2dq59pqyl7t.jpg",
      description: "fotografiando el paisaje"
    }
  ],
  tags: [
    "Aventura"
  ]
}

export default async function CreateAlbum({ params }: { params: { id: string } }) {
  const id = params.id
  const url = BASE_URL + '/album/' + id
  /* const data = await fetch(url)
  const album: Album = await data.json() */

  return (
    <div className="bg-white w-full min-h-screen text-black relative flex flex-col">
      <div className="p-4 absolute top-0 w-full">
        <Link href={'/'} className="absolute self-center">Regresar</Link>
        <h2 className="text-base text-center">Crear Albúm</h2>
      </div>
      <EditAlbumForm initialData={album} />
    </div>
  )
}