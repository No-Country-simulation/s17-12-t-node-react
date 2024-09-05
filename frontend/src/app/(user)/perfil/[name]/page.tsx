
import { IconConfig, IconFlechaAtras } from "@/components/icons";
import imageUser from "/public/image/avatarUser.png"
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
            <Image src={imageUser} alt="Avatar" className="mx-auto my-5" />
            <h2 className="font-bold text-2xl text-center">{params.name}</h2>
            <div>
                <ul className="flex justify-between text-2xl px-4 py-4">
                    <li className="bg-[#FA8888] text-[#EFEFEF] px-6 py-1 rounded-full">
                        <Link href={"/"}>Album</Link>
                    </li>
                    <li className="text-[#F87D7D]">
                        <Link href={"/"}>Like</Link>
                    </li>
                    <li className="text-[#F87D7D]">
                        <Link href={"/"}>Etiquetas</Link>
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
