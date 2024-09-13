import Image from "next/image";
import { IconBook, IconChat, IconCorazon, IconLocation, IconPaper } from "../icons";
import { SwiperImages } from "../swiper/SwiperImages";
import userImage from "/public/feed/user/image7.jpg"
import { AlbumFromFetch } from "@/interfaces/album";
import Link from "next/link";
import ReadOnlyEditor from "../LexicalEditor/ReadOnly";
import { getUserById } from "@/actions/userActions";

export async function CardFeed({ album }: { album: AlbumFromFetch }) {

    const user = await getUserById(album.userId)
    // console.log(album);
    return (
        <div className="mt-10">

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
                    <IconCorazon />
                    <IconChat />
                    <IconPaper />
                </div>

                <IconBook />
            </div>

            <div className="flex flex-wrap px-10">
                <Link href={'/perfil/' + album.userId}><strong>{album.userId}:</strong></Link>
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
