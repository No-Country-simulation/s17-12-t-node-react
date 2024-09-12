"use client"

import { useRouter } from "next/navigation";
import { IconFlechaAtras } from "../icons";

export function BackArrow() {

    const router = useRouter()

    return (
        <div onClick={router.back}>
            <IconFlechaAtras className="text-gray-500 cursor-pointer" />
        </div>
    )
}
