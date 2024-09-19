import { AlbumFeedSkeleton } from "./albumFeedSkeleton"

export function HomeSkeleton() {
  const skeletonArray = Array(4).fill(0)

  return (
    <div className="pb-8 px-2">
      <div className="border-b border-gray">
        <div className="mx-auto h-8 w-48 my-6 bg-TextPrimary"></div>
      </div>

      <div className="flex justify-between gap-10 mt-2 overflow-hidden">
        {skeletonArray.map((_, index) => (
          <div key={index} className="flex flex-col justify-center">
            <div className="size-20 rounded-full bg-FondoPrimary" />
            <div className="h-6 w-20 bg-FondoPrimary" />
          </div>
        ))}
      </div>

      <AlbumFeedSkeleton />
    </div>
  )
}