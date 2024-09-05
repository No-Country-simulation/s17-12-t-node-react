
import { IconConfig, IconFlechaAtras } from "@/components/icons";
import imageUser from "/public/feed/paisaje.jpg"
import { ImagesAlbum } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default async function PerfilPage({ params }: { params: { name: string } }) {

    return (
        <article >
            <div className="flex justify-between bg-[#D9D9D9] pt-10 pb-2 px-2 text-[#979797]">
                <IconFlechaAtras />
                <h1 className=" font-bold text-xl text-black">Mi Perfil</h1>
                <IconConfig />
            </div>
            <div className="flex items-center ml-8 gap-3 my-6">
                <figure className="relative size-20 rounded-full overflow-hidden">
                    <Image src={imageUser} alt="Avatar" className="object-cover" fill />
                </figure>
                <h2 className="font-bold text-2xl ">{params.name}</h2>
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

                <div className="grid grid-cols-3 gap-2 px-3 ">
                    {
                        ImagesAlbum.map((ima, i) => (
                            <div key={i} className="min-h-[100px] h-full bg-[#C4C4C4] relative overflow-hidden
                            [&:nth-child(1)]:col-span-2 [&:nth-child(1)]:row-span-3 [&:nth-child(1)]:rounded-tl-2xl   
                            [&:nth-child(2)]:rounded-tr-2xl                 
                            [&:nth-last-child(2)]:rounded-bl-2xl
                            [&:nth-last-child(1)]:rounded-br-2xl
                            [&:nth-child(6)]:col-span-2 
                            ">
                                <Image src={ima.url} alt="" fill className="object-cover" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </article>
    );
}
