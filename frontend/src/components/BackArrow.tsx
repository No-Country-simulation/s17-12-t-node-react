"use client"

import { useRouter } from "next/navigation";
import { IconFlechaAtras } from "./icons";

export function BackArrow() {

    const router = useRouter()

    return (
        <div onClick={router.back}>
            <IconFlechaAtras className="ml-10 text-gray-500" />
        </div>
    )
}
