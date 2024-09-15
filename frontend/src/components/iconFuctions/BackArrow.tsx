"use client"

import { useRouter } from "next/navigation";
import { IconFlechaAtras } from "../icons";

interface Prop {
    className?: string
}

export function BackArrow({ className }: Prop) {

    const router = useRouter()

    return (
        <div onClick={router.back}>
            <IconFlechaAtras className={`text-gray-500 cursor-pointer ${className && className}`} />
        </div>
    )
}
