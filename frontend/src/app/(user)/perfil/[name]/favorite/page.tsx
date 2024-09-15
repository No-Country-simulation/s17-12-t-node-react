"use client"

import { IconLocation } from "@/components/icons";
import { albumStore } from "@/store/aVisitar-store";
import imageMapa from "/public/mapa.png"
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function FavoritePage() {
    const getAlbum = albumStore(state => state.getAlbum)

    // Función para manejar las clases de layout del grid
    const getGridCols = (photoLength: number) => {
        switch (photoLength) {
            case 1: return 'grid-cols-1';
            case 2: return 'grid-cols-2';
            case 3: return 'grid-cols-3';
            case 4: return 'grid-cols-10';
            case 6: return 'grid-cols-3';
            default: return 'grid-cols-2';
        }
    };

    // Función para obtener las clases personalizadas según la cantidad de imágenes
    const getPhotoClasses = (photoLength: number) => {
        switch (photoLength) {
            case 2:
                return "[&:nth-child(1)]:rounded-s-2xl [&:nth-child(2)]:rounded-r-2xl h-[350px]";
            case 3:
                return `[&:nth-child(1)]:rounded-tl-2xl [&:nth-child(1)]:h-[200px] sm:[&:nth-child(1)]:h-[300px]
                        [&:nth-child(2)]:rounded-tr-2xl [&:nth-child(3)]:rounded-b-2xl [&:nth-child(3)]:h-[170px]
                        [&:nth-child(3)]:col-span-2 sm:[&:nth-child(3)]:h-[250px]`;
            case 4:
                return `[&:nth-child(1)]:rounded-tl-2xl [&:nth-child(1)]:col-span-6 [&:nth-child(1)]:h-[200px] sm:[&:nth-child(1)]:h-[250px]
                        [&:nth-child(2)]:rounded-tr-2xl [&:nth-child(2)]:col-span-4
                        [&:nth-child(3)]:rounded-bl-2xl [&:nth-child(3)]:col-span-4 [&:nth-child(3)]:h-[170px] sm:[&:nth-child(3)]:h-[200px]
                        [&:nth-child(4)]:rounded-br-2xl [&:nth-child(4)]:col-span-6 [&:nth-child(4)]:h-[170px] sm:[&:nth-child(4)]:h-[200px]`;
            case 5:
                return `[&:nth-child(1)]:col-span-2 [&:nth-child(1)]:row-span-3 [&:nth-child(1)]:rounded-tl-2xl sm:[&:nth-child(1)]:h-[400px]
                        [&:nth-child(2)]:rounded-tr-2xl [&:nth-child(5)]:col-span-3 [&:nth-child(5)]:rounded-b-2xl sm:[&:nth-child(5)]:h-[230px]`;
            case 6:
                return `[&:nth-child(1)]:col-span-2 [&:nth-child(1)]:row-span-3 [&:nth-child(1)]:rounded-tl-2xl sm:[&:nth-child(1)]:h-[400px]
                        [&:nth-last-child(1)]:rounded-br-2xl [&:nth-last-child(2)]:rounded-bl-2xl
                        [&:nth-child(2)]:rounded-tr-2xl [&:nth-child(6)]:col-span-2 sm:[&:nth-child(6)]:h-[230px]`;
            default:
                return '';
        }
    };

    return (
        <div>

            {
                getAlbum.map((album, index) => (
                    // BLOQUE 
                    <div key={index} className="mb-16">

                        {/* LOCALIZATION Y TAG */}

                        <div className="grid grid-cols-2 px-4 text-TextPrimary py-6">
                            <div className="flex items-center gap-2 ">
                                <h2 className="bg-amber-100 rounded-xl px-2 border ">{album.tags[0]}</h2>
                            </div>
                            <div className="flex items-center">
                                <IconLocation />
                                <h2 className="font-bold truncate">{album.tags[album.tags.length - 1]}</h2>
                            </div>
                        </div>

                        <div className={clsx('grid gap-2 px-3', getGridCols(album.photos.length))}>
                            {
                                // IMÁGENES 
                                album.photos.map((photo, i) => (
                                    <div key={i} className={clsx(
                                        'min-h-[100px] h-full bg-[#C4C4C4] relative overflow-hidden',
                                        getPhotoClasses(album.photos.length)
                                    )}>
                                        <Link href={`/photo/${album.id}`}><Image src={photo.url} alt="" fill className="object-cover w-full" priority /></Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }

            {
                getAlbum.length === 0 && (
                    <div className="flex justify-center mt-6">
                        <div className="relative">
                            <div className="bg-white/40 absolute h-[200px] -bottom-[40%] left-1/2 -translate-x-1/2 w-full flex justify-center px-4 text-xl font-bold rounded-2xl shadow-sombra flex-col text-center text-TextPrimary gap-4">
                                <p className="">El planeta está esperando que lo recorras</p>
                                <p>¡Agrega lugares a visitar!</p>
                            </div>
                            <Image src={imageMapa} alt="mapa" />
                        </div>
                    </div>
                )
            }
        </div>
    );
}
