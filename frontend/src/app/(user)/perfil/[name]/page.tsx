
import Image from "next/image";
import imageUser from "/public/image/avatarUser.png"
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";



export default async function PerfilPage({ params }: { params: { name: string } }) {

    // const data = await fetch("http://localhost:3000/user")
    //     .then(res => res.json())

    // console.log(data)
    return (
        <article >
            <div className="flex justify-between bg-[#D9D9D9] pt-10 pb-2 px-2 text-[#979797]">
                <IoMdArrowRoundBack size={30} />
                <h1 className=" font-bold text-xl text-black">Mi Perfil</h1>
                <IoSettingsSharp size={30} />
            </div>
            <Image src={imageUser} alt="Avatar" className="mx-auto my-5" />
            <h2 className="font-bold text-2xl text-center">{params.name}</h2>
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
                    <div className="min-h-[100px] h-full bg-[#C4C4C4] col-span-2 row-span-3 rounded-s-2xl relative overflow-hidden">
                        <Image src={"https://pbs.twimg.com/media/FLUsCsYXIAEiWCo.jpg:large"} alt="paisaje" fill className="object-cover" />
                    </div>
                    <div className="h-[100px] bg-[#C4C4C4] rounded-e-2xl relative overflow-hidden">
                        <Image src={"https://www.mibauldeblogs.com/wp-content/uploads/2023/03/piedra-penol-guatape.jpg"} alt="paisaje" fill className="object-cover" />
                    </div>
                    <div className="h-[100px] bg-[#C4C4C4] rounded-e-2xl relative overflow-hidden">
                        <Image src={"https://media.tacdn.com/media/attractions-splice-spp-674x446/11/ac/f2/66.jpg"} alt="paisaje" fill className="object-cover" />
                    </div>
                    <div className="h-[100px] bg-[#C4C4C4] rounded-e-2xl relative overflow-hidden">
                        <Image src={"https://apassionandapassport.com/wp-content/uploads/2022/05/guatape-colombia-piedra-del-penol-views.jpg"} alt="paisaje" fill className="object-cover" />
                    </div>
                    <div className="h-[100px] bg-[#C4C4C4] rounded-s-2xl relative overflow-hidden">
                        <Image src={"https://guiaparamochileros.com/wp-content/uploads/2015/12/Mirador-de-la-piedra-del-peñon.jpg"} alt="paisaje" fill className="object-cover" />
                    </div>
                    <div className="h-[100px] bg-[#C4C4C4] col-span-2 rounded-e-2xl relative overflow-hidden">
                        <Image src={"https://glampinglacepa.co/wp-content/uploads/2022/12/Piedra-de-El-Penol-un-destino-imperdible-en-Antioquia.jpg"} alt="paisaje" fill className="object-cover" />
                    </div>
                </div>
            </div>
        </article>
    );
}