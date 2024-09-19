import { IconLocation, IconPaper } from "@/components/icons";

export function AlbumFeedSkeleton() {
  const skeletonArray = Array(5).fill(0)

  return (
    <>
      {skeletonArray.map((_, index) => (
        <div key={index} className="mt-10 border py-6 rounded-[30px] md:rounded-[50px] shadow-sombra animate-pulse">

          <div className="grid grid-cols-2 px-4 text-TextPrimary">
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-FondoPrimary"></div>
              <div className="w-24 h-6 bg-FondoPrimary rounded"></div>
            </div>
            <div className="flex items-center">
              <IconLocation />
              <div className="w-full h-6 bg-FondoPrimary rounded ml-2"></div>
            </div>
          </div>

          <div className="w-full h-64 bg-FondoPrimary mt-4"></div>

          <div className="flex justify-between py-4 px-4 text-TextPrimary">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-FondoPrimary rounded-full"></div>
              <div className="w-10 h-10 bg-FondoPrimary rounded-full"></div>
              <div className="w-10 h-10 bg-FondoPrimary rounded-full"></div>
            </div>

            <div className="w-10 h-10 bg-FondoPrimary rounded-full"></div>
          </div>

          <div className="flex flex-col flex-wrap px-4">
            <div className="w-32 h-6 bg-FondoPrimary rounded mb-2"></div>
            <div className="w-full h-28 bg-FondoPrimary rounded mb-2"></div>
            <div className="w-20 h-6 bg-FondoPrimary rounded"></div>
          </div>
        </div>
      ))}
    </>

  );
}
