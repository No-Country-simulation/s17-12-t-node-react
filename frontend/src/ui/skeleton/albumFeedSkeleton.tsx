import { IconLocation } from "@/components/icons";

export function AlbumFeedSkeleton() {
  const arrayOfFakeUsers = new Array(3)
  return (
    <>
      {arrayOfFakeUsers.map((item, index) => (
        <div key={index} className='flex flex-col'>
          <div className="rounded-full object-cover size-20 bg-FondoPrimary animate-pulse" />
          <div className='bg-FondoPrimary w-12 h-6' />
        </div>
      ))}

      {arrayOfFakeUsers.map((item, index) => (
        <div key={index} className='mt-10 border bg-gray py-6 rounded-[30px] md:rounded-[50px] shadow-sombra'>
          <div className="grid grid-cols-2 px-4">
            <div className="flex items-center gap-2">
              <div className="object-cover size-11 rounded-full bg-FondoPrimary" />
              <div className="bg-FondoPrimary w-12 h-6" />
            </div>
            <div className="flex items-center">
              <IconLocation />
              <h2 className="w-48 h-6 bg-FondoPrimary" />
            </div>

            <div className="w-[459px] h-[216px] bg-FondoPrimary" />

            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="bg-FondoPrimary rounded-full size-[30px]" />
                <div className="bg-FondoPrimary rounded-full size-[30px]" />
                <div className="bg-FondoPrimary rounded-full size-[30px]" />
              </div>
              <div className="bg-FondoPrimary rounded-full size-[30px]" />
            </div>

            <div className="flex flex-col">
              <div className="w-32 h-6 bg-FondoPrimary" />
              <div className="flex flex-col gap-1">
                <div className="w-full h-6 bg-FondoPrimary" />
                <div className="w-2/3 h-6 bg-FondoPrimary" />
                <div className="w-full h-6 bg-FondoPrimary" />
              </div>
            </div>

          </div>
        </div>
      ))}
    </>
  );
}