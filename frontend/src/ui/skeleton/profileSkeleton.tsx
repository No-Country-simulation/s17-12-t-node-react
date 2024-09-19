import clsx from "clsx";

const SkeletonCardAlbum = ({ photosLength }: { photosLength: number }) => {
  return (
    <div className={clsx(
      'grid gap-2 px-3',
      photosLength === 6 || photosLength === 5 ? 'grid-cols-3'
        : photosLength === 1 ? 'grid-cols-1'
          : photosLength === 4 ? 'grid-cols-10'
            : "grid-cols-2"
    )}>
      {Array(photosLength).fill(0).map((_, i) => (
        <div key={i} className={clsx(`min-h-[100px] h-full bg-FondoPrimary relative overflow-hidden`,
          `[&:nth-child(1)]:col-span-2 [&:nth-child(1)]:row-span-3 [&:nth-child(1)]:rounded-tl-2xl sm:[&:nth-child(1)]:h-[400px]
                                [&:nth-last-child(1)]:rounded-br-2xl
                                [&:nth-last-child(2)]:rounded-bl-2xl
                                [&:nth-child(2)]:rounded-tr-2xl                 
                                [&:nth-child(6)]:col-span-2 sm:[&:nth-child(6)]:h-[230px]`)}></div>
      ))}
    </div>
  );
};

export const ProfileSkeleton = () => {

  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-center bg-TextPrimary p-4">
        <div className="size-8 bg-FondoPrimary rounded-full"></div>
        <div className="w-24 h-6 bg-FondoPrimary rounded"></div>
        <div className="size-8 bg-FondoPrimary rounded-full"></div>
      </div>

      <div className="flex items-center gap-3 mt-6 ml-8 my-6">
        <div className="size-20 bg-FondoPrimary rounded-full"></div>
        <div className="w-40 h-6 bg-FondoPrimary rounded"></div>
      </div>

      <div className="flex justify-between mt-6 p-4">
        <div className="w-20 h-8 bg-FondoPrimary rounded-full"></div>
        <div className="w-20 h-8 bg-FondoPrimary rounded-full"></div>
      </div>

      <SkeletonCardAlbum photosLength={6} />
    </div>
  );
};
