import { PhotoFromAlbum } from "@/interfaces/album";
import { ImagesAlbum } from "@/utils";
import clsx from "clsx";
import Image from "next/image";


interface Props {
  photos: PhotoFromAlbum[] | Photo[]
}

interface Photo {
  url: string
}


export default function CardAlbum({ photos }: Props) {
  return (
    <div className={clsx(
      'grid gap-2 px-3',
      photos.length === 6 || photos.length === 5 ? 'grid-cols-3'
        : photos.length === 1 ? 'grid-cols-1'
          : photos.length === 4 ? 'grid-cols-10'
            : "grid-cols-2"
    )}>
      {
        photos.map((ima: any, i: number) => (
          <div key={i} className={clsx(`min-h-[100px] h-full bg-[#C4C4C4] relative overflow-hidden`,
            photos.length === 2 &&
            "h-[350px] [&:nth-child(1)]:rounded-s-2xl [&:nth-child(2)]:rounded-r-2xl",
            photos.length === 3 &&
            `[&:nth-child(1)]:rounded-tl-2xl [&:nth-child(1)]:h-[200px] sm:[&:nth-child(1)]:h-[300px]
                                 [&:nth-child(2)]:rounded-tr-2xl
                                 [&:nth-child(3)]:rounded-b-2xl [&:nth-child(3)]:h-[170px] [&:nth-child(3)]:col-span-2 sm:[&:nth-child(3)]:h-[250px]`,
            photos.length === 4 &&
            `[&:nth-child(1)]:rounded-tl-2xl [&:nth-child(1)]:col-span-6 [&:nth-child(1)]:h-[200px] sm:[&:nth-child(1)]:h-[250px]
                                [&:nth-child(2)]:rounded-tr-2xl [&:nth-child(2)]:col-span-4
                                [&:nth-child(3)]:rounded-bl-2xl [&:nth-child(3)]:col-span-4 [&:nth-child(3)]:h-[170px] sm:[&:nth-child(3)]:h-[200px]
                                [&:nth-child(4)]:rounded-br-2xl [&:nth-child(4)]:col-span-6 [&:nth-child(4)]:h-[170px] sm:[&:nth-child(4)]:h-[200px]
                                 `,
            photos.length === 5 &&
            `
                                [&:nth-child(1)]:col-span-2 [&:nth-child(1)]:row-span-3 [&:nth-child(1)]:rounded-tl-2xl sm:[&:nth-child(1)]:h-[400px]
                                [&:nth-child(2)]:rounded-tr-2xl
                                [&:nth-child(5)]:col-span-3 [&:nth-child(5)]:rounded-b-2xl sm:[&:nth-child(5)]:h-[230px]`,
            photos.length === 6 &&
            `[&:nth-child(1)]:col-span-2 [&:nth-child(1)]:row-span-3 [&:nth-child(1)]:rounded-tl-2xl sm:[&:nth-child(1)]:h-[400px]
                                [&:nth-last-child(1)]:rounded-br-2xl
                                [&:nth-last-child(2)]:rounded-bl-2xl
                                [&:nth-child(2)]:rounded-tr-2xl                 
                                [&:nth-child(6)]:col-span-2 sm:[&:nth-child(6)]:h-[230px]`)} >
            <Image src={ima.url} alt="" fill className="object-cover w-full" priority />
          </div>
        ))
      }
    </div>
  )
}
