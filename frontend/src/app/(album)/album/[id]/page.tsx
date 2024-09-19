import { BackArrow } from "@/components";
import AlbumDetailsLoader from "@/components/AlbumDetailsLoader";
import AlbumDetailsSkeleton from "@/ui/skeleton/albumDetailsSkeleton";
import { Suspense } from "react";

export const revalidate = 0

export default function AlbumDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id

  return (
    <div>
      <div className="mx-4 mt-2 flex">
        <BackArrow />
      </div>
      <Suspense fallback={<AlbumDetailsSkeleton />}>
        <AlbumDetailsLoader id={id} />
      </Suspense>
    </div>
  )
}