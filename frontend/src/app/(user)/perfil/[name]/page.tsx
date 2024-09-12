

import { ImagesAlbum } from "@/utils";
import Image from "next/image";
import clsx from "clsx";

//cambiar name por id en algun momento
export default async function PerfilPage({ params }: { params: { name: string } }) {


    console.log(params)

    return (
        <article >

            <div>

                <div className={clsx(
                    'grid gap-2 px-3',
                    ImagesAlbum.length === 6 || ImagesAlbum.length === 5 ? 'grid-cols-3'
                        : ImagesAlbum.length === 1 ? 'grid-cols-1'
                            : ImagesAlbum.length === 4 ? 'grid-cols-10'
                                : "grid-cols-2"
                )}>
                    {
                        ImagesAlbum.map((ima, i) => (
                            <div key={i} className={clsx(`min-h-[100px] h-full bg-[#C4C4C4] relative overflow-hidden`,
                                ImagesAlbum.length === 2 &&
                                "h-[300px] [&:nth-child(1)]:rounded-s-2xl [&:nth-child(2)]:rounded-r-2xl",
                                ImagesAlbum.length === 3 &&
                                `h-[250px] [&:nth-child(1)]:rounded-tl-2xl [&:nth-child(2)]:rounded-tr-2xl
                                 [&:nth-child(3)]:rounded-b-2xl [&:nth-child(3)]:h-[150px] [&:nth-child(3)]:col-span-2`,
                                ImagesAlbum.length === 4 &&
                                `h-[200px]
                                [&:nth-child(1)]:rounded-tl-2xl [&:nth-child(1)]:col-span-6
                                [&:nth-child(2)]:rounded-tr-2xl [&:nth-child(2)]:col-span-4
                                [&:nth-child(3)]:rounded-bl-2xl [&:nth-child(3)]:col-span-4 [&:nth-child(3)]:h-[170px]
                                [&:nth-child(4)]:rounded-br-2xl [&:nth-child(4)]:col-span-6 [&:nth-child(4)]:h-[170px]
                                 `,
                                ImagesAlbum.length === 5 &&
                                `min-h-[100px]
                                [&:nth-child(1)]:col-span-2 [&:nth-child(1)]:row-span-3 [&:nth-child(1)]:rounded-tl-2xl
                                [&:nth-child(2)]:rounded-tr-2xl
                                [&:nth-child(5)]:col-span-3 [&:nth-child(5)]:rounded-b-2xl`,
                                ImagesAlbum.length === 6 &&
                                `[&:nth-child(1)]:col-span-2 [&:nth-child(1)]:row-span-3 [&:nth-child(1)]:rounded-tl-2xl   
                                [&:nth-last-child(1)]:rounded-br-2xl
                                [&:nth-last-child(2)]:rounded-bl-2xl
                                [&:nth-child(2)]:rounded-tr-2xl                 
                                [&:nth-child(6)]:col-span-2 `)} >
                                <Image src={ima.url} alt="" fill className="object-cover w-full" priority />
                            </div>
                        ))
                    }
                </div>
            </div>
        </article>
    );
}
