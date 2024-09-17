import Image from "next/image";
import { IconChat, IconLocation, IconPaper } from "../icons";
import { SwiperImages } from "../swiper/SwiperImages";
import userImage from "/public/feed/user/image7.jpg"
import { AlbumFromFetch } from "@/interfaces/album";
import { LikeButton } from "@/components";

import Link from "next/link";
import ReadOnlyEditor from "../LexicalEditor/ReadOnly";
import { getUserById } from "@/actions/userActions";
import AVisitar from "../iconFuctions/AVisitar";


export async function CardFeed({ album }: { album: AlbumFromFetch }) {
    const user = await getUserById(album.userId)
    return (
        <div className="mt-10 border py-6 rounded-[30px] md:rounded-[50px] shadow-sombra">

            {/* AVATAR Y LOCATION  */}
            <div className="grid grid-cols-2 px-4 text-TextPrimary">
                <div className="flex items-center gap-2 ">
                    <Image src={user ? user.imageUrl : userImage} width={400} height={400} alt="foto" className="object-cover size-11 rounded-full bg-gray-500" />
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
                    <LikeButton id={album.id} />
                    <IconChat />
                    <IconPaper />
                </div>

                <AVisitar album={album} />
            </div>

            <div className="flex flex-col flex-wrap px-4">
                <Link href={'/perfil/' + album.userId} className="font-bold underline">{user?.username}:</Link>
                {
                    album.description.includes('"root":')
                        ? <ReadOnlyEditor feed savedContent={album.description} />
                        : <>{album.description}</>
                }
                <Link href={'/album/' + album.id} className="text-blue-600 cursor-pointer">ver mas...</Link>
            </div>
        </div>
    )
}
