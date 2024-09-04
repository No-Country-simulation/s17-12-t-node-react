import Image from "next/image";
import { IconBook, IconChat, IconCorazon, IconLocation, IconPaper } from "../icons";
import { SwiperImages } from "../swiper/SwiperImages";
import userImage from "/public/feed/user/image7.jpg"

export function CardFeed() {
    return (
        <div className="mt-10">

            {/* AVATAR Y LOCATION  */}
            <div className="flex justify-between px-4 text-TextPrimary">
                <div className="flex items-center gap-2 ">
                    <Image src={userImage} alt="foto" className="size-11 rounded-full bg-gray-500" />
                    <h2 className="font-bold">Aventura</h2>
                </div>
                <div className="flex items-center">
                    <IconLocation />
                    <h2 className="font-bold">Location</h2>
                </div>
            </div>

            <SwiperImages />

            <div className="flex justify-between py-4 px-4 text-TextPrimary">
                <div className="flex gap-4 ">
                    <IconCorazon />
                    <IconChat />
                    <IconPaper />
                </div>

                <IconBook />
            </div>

            <p className="px-10">Frankis  los paisajes de Purmamarca, Jujuy, Arg. bla bla etc  ver <span className="text-red-600">mas...</span></p>

        </div>
    )
}
