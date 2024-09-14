"use client"

import { IconCorazon, IconCorazonLleno } from "../icons"
import { useEffect, useState } from "react"

interface Prop {
    id: string
}

export function LikeButton({ id }: Prop) {

    const saveLocal = "like" + id

    const [isLike, setIsLike] = useState<boolean | undefined>()

    useEffect(() => {
        const savedColor = localStorage.getItem(saveLocal);
        if (savedColor) {
            setIsLike(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleLike = () => {
        if (isLike) {
            setIsLike(false)
            localStorage.removeItem(saveLocal)
        } else {
            setIsLike(true)
            localStorage.setItem(saveLocal, saveLocal)
        }
    }

    return (
        <div className="cursor-pointer" onClick={handleLike}>
            {
                isLike
                    ?
                    (<IconCorazonLleno />)
                    :
                    (<IconCorazon />)
            }

        </div>
    )
}
