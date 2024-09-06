import CreateAlbumForm from "@/components/CreateAlbumForm";
import Link from "next/link";

export default function CreateAlbum() {
  return (
    <div className="bg-white w-full min-h-screen text-black relative flex flex-col">
      <div className="p-4 absolute bg-gray-300 top-0 w-full">
        <Link href={'/'} className="absolute self-center">Regresar</Link>
        <h2 className="text-base text-center">Crear Albúm</h2>
      </div>
      <CreateAlbumForm />
    </div>
  )
}