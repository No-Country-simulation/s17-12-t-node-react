export default function AlbumDetailsSkeleton() {
  return (
    <div className="p-4 flex flex-col gap-8 animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="w-80 h-8 bg-TextPrimary rounded"></div>

        <div className="flex gap-2 flex-wrap">
          <div className="h-6 w-16 bg-FondoPrimary rounded-xl"></div>
          <div className="h-6 w-40 bg-FondoPrimary rounded-xl"></div>
        </div>

        <div className="w-full h-64 bg-FondoPrimary"></div>

        <div className="flex flex-col gap-2 py-2">
          <div className="flex gap-4 items-center">
            <div className="h-6 w-6 bg-red-300 rounded-full"></div>
            <div className="w-44 h-6 bg-FondoPrimary rounded"></div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="h-6 w-6 bg-green-300 rounded-full"></div>
            <div className="w-64 h-6 bg-FondoPrimary rounded"></div>
          </div>
        </div>

        <div className="flex w-max h-12 items-center gap-2 mb-2">
          <div className="w-12 h-12 bg-TextPrimary rounded-full"></div>
          <div className="w-64 h-6 bg-FondoPrimary rounded"></div>
        </div>
      </div>

      <div className="w-full h-40 bg-FondoPrimary rounded-xl"></div>

      <div className="relative w-full overflow-hidden rounded-xl">
        <div className="w-full h-96 bg-FondoPrimary rounded-xl"></div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-1/3 h-8 bg-TextPrimary rounded"></div>
        <div className="flex flex-wrap gap-2">
          <div className="w-32 h-24 bg-FondoPrimary rounded-xl"></div>
          <div className="w-32 h-24 bg-FondoPrimary rounded-xl"></div>
          <div className="w-32 h-24 bg-FondoPrimary rounded-xl"></div>
        </div>
      </div>

      <div className="w-full h-40 bg-FondoPrimary rounded-xl"></div>

      <div>
        <div className="w-1/4 h-6 bg-FondoPrimary rounded"></div>
      </div>
    </div>
  );
}
