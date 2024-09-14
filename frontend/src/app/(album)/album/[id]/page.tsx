import { BackArrow } from "@/components";
import AlbumDetailsLoader from "@/components/AlbumDetailsLoader";
import { Suspense } from "react";


export default function AlbumDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <div>
      <div className="mx-4 mt-2 flex">
        <BackArrow />
      </div>
      <Suspense fallback={<span>Cargando Vista detallada</span>}>
        <AlbumDetailsLoader id={id} />
      </Suspense>
    </div>
  )
}