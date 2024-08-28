
import Image from "next/image";
import imageUser from "/public/image/avatarUser.png"
import Link from "next/link";



export default async function PerfilPage({ params }: { params: { name: string } }) {

    const data = await fetch("/api")

    return (
        <article className="text-center">
            <h1 className="bg-[#D9D9D9] pt-10 font-bold text-xl">Mi Perfil</h1>
            <Image src={imageUser} alt="Avatar" className="mx-auto my-5" />
            <h2 className="font-bold text-2xl">{params.name}</h2>
            <div>
                <ul className="flex justify-between text-2xl px-4 py-4">
                    <li className="bg-[#979797] text-[#EFEFEF] px-6 py-1 rounded-full">
                        <Link href={"/"}>Album</Link>
                    </li>
                    <li>
                        <Link href={"/"}>Like</Link>
                    </li>
                    <li>
                        <Link href={"/"}>Etiquetas</Link>
                    </li>
                </ul>

                <div className="grid grid-cols-3 gap-2 px-3">
                    <div className="min-h-[100px] h-full bg-[#C4C4C4] col-span-2 row-span-3 rounded-s-2xl"></div>
                    <div className="h-[100px] bg-[#C4C4C4] rounded-e-2xl"></div>
                    <div className="h-[100px] bg-[#C4C4C4] rounded-e-2xl"></div>
                    <div className="h-[100px] bg-[#C4C4C4] rounded-e-2xl"></div>
                    <div className="h-[100px] bg-[#C4C4C4] rounded-s-2xl"></div>
                    <div className="h-[100px] bg-[#C4C4C4] col-span-2 rounded-e-2xl"></div>
                </div>
            </div>
        </article>
    );
}