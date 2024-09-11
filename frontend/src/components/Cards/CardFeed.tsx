import Image from "next/image";
import { IconBook, IconChat, IconCorazon, IconLocation, IconPaper } from "../icons";
import { SwiperImages } from "../swiper/SwiperImages";
import userImage from "/public/feed/user/image7.jpg"
import { AlbumFromFetch } from "@/interfaces/album";

export function CardFeed({ album }: { album: AlbumFromFetch }) {
    // console.log(album);
    return (
        <div className="mt-10">

            {/* AVATAR Y LOCATION  */}
            <div className="grid grid-cols-2 px-4 text-TextPrimary">
                <div className="flex items-center gap-2 ">
                    <Image src={userImage} alt="foto" className="size-11 rounded-full bg-gray-500" />
                    <h2 className="font-bold">{album.tags[0]}</h2>
                </div>
                <div className="flex items-center">
                    <IconLocation />
                    <h2 className="font-bold truncate">{album.tags[album.tags.length - 1]}</h2>
                </div>
            </div>

            {/* IMÁGENES  */}
            <SwiperImages images={album.photos} />

            {/* DESCRIPCIÓN  */}
            <div className="flex justify-between py-4 px-4 text-TextPrimary">
                <div className="flex gap-4 ">
                    <IconCorazon />
                    <IconChat />
                    <IconPaper />
                </div>

                <IconBook />
            </div>

            <p className="px-10"><strong>{album.userId}</strong> {album.description}<span className="text-blue-600 cursor-pointer">ver mas...</span></p>

        </div>
    )
}
