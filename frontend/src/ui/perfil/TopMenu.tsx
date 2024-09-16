"use client"

import { BackArrow } from "@/components";
import { IconConfig } from "@/components/icons";
import Link from "next/link";

export default function TopMenu({ id }: { id: string }) {

    const token = localStorage.getItem("userId")


    return (
        <div className="flex justify-between bg-[#D9D9D9] pt-10 pb-2 px-2 text-[#979797]">
            <Link href={'/'}>
                <BackArrow />
            </Link>
            <h1 className=" font-bold text-xl text-black">
                {
                    token === id ? "Mi Perfil" : "Perfil"
                }
            </h1>
            <Link href={'/edit/' + id}>
                <IconConfig />
            </Link>
        </div>
    )
}
