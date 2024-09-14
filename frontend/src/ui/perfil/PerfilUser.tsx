
import imageUser from "/public/feed/paisaje.jpg"
import { IconConfig } from "@/components/icons";
import { BackArrow } from "@/components";
import { ImagesAlbum } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/interfaces/user";
import profileImage from "/public/feed/paisaje.jpg"
import { getUser } from "@/actions/userActions";
import clsx from "clsx";

const BASE_URL = process.env.API_URL

//cambiar name por id en algun momento
export default async function PerfilUser() {
    const id = "user123"
    const url = BASE_URL + '/user/' + id
    const data = await fetch(url)
    const profile: User = await data.json()
    console.log(profile);

    // const user: User = await getUser()

    const profileImage = profile.imageUrl ? profile.imageUrl : imageUser
    const profileName = profile.username ? profile.username : id

    return (
        <article >
            <div className="flex justify-between bg-[#D9D9D9] pt-10 pb-2 px-2 text-[#979797]">
                <Link href={'/feed'}>
                    <BackArrow />
                </Link>
                <h1 className=" font-bold text-xl text-black">Mi Perfil</h1>
                <Link href={'/edit/' + profile._id}>
                    <IconConfig />
                </Link>
            </div>
            {/*             <div className="w-[95px] h-[95px] rounded-full overflow-hidden mx-auto my-5">
                <Image src={profile.imageUrl || imageUser} width={800} height={800} alt="Avatar" className="w-full h-full" />
            </div>
            <h2 className="font-bold text-2xl text-center">{profile.username}</h2> */}
            <div className="flex items-center ml-8 gap-3 my-6">
                <figure className="relative size-20 rounded-full overflow-hidden">
                    <Image src={profileImage} alt="Avatar" className="object-cover" fill />
                </figure>
                <h2 className="font-bold text-2xl ">{profileName}</h2>
            </div>
            <div>
                <ul className="flex justify-between text-2xl px-4 py-4">
                    <li className="bg-[#6C7263] text-[#EFEFEF] px-6 py-1 rounded-full">
                        <Link href={"/"}>Album</Link>
                    </li>
                    <li className="text-TextPrimary">
                        <Link href={"/"}>A visitar</Link>
                    </li>
                </ul>

                <div className={clsx(
                    'grid gap-2 px-3',
                    ImagesAlbum.length === 6 || ImagesAlbum.length === 5 ? 'grid-cols-3'
                        : ImagesAlbum.length === 1 ? 'grid-cols-1'
                            : "grid-cols-10"
                )}>
                    {
                        ImagesAlbum.map((ima: any, i: number) => (
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
