"use client"

import Link from "next/link";
import { usePathname, } from "next/navigation";

interface Props {
    params: string
}

export default function NavBar({ params }: Props) {

    const pathName = usePathname()

    const listPerfil = [{ url: `/perfil/${params}`, title: "Album" }, { url: `/perfil/${params}/favorite`, title: "A visitar" }]

    console.log({ pathName })

    return (
        <ul className="flex justify-between text-2xl px-4 py-4">
            {
                listPerfil.map(list => (
                    <li key={list.title} className={`text-TextPrimary px-6 py-1 rounded-full ${list.url === pathName && "bg-[#6C7263] text-[#EFEFEF]"}`}>
                        <Link href={list.url}>{list.title}</Link>
                    </li>
                ))
            }
        </ul>
    )
}
