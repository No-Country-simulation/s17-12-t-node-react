import { BackArrow } from "@/components";
import CreateAlbumForm from "@/components/CreateAlbumForm";

export default function CreateAlbum() {
  return (
    <div className="bg-white w-full min-h-screen text-black relative flex flex-col">
      <div className="flex justify-center p-4 absolute bg-FondoPrimary text-white top-0 w-full">
        <div className="left-1 top-3 absolute self-center">
          <BackArrow />
        </div>
        <h2 className="text-base text-center">Crear Albúm</h2>
      </div>
      <CreateAlbumForm />
    </div>
  )
}