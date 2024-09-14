"use client"

import { useEffect, useState } from "react"
import { IconBook } from "../icons"
import { IconBookLleno } from "../icons/Icons"
import { AlbumFromFetch } from "@/interfaces/album"
import { albumStore } from "@/store/aVisitar-store"

export default function AVisitar({ album }: { album: AlbumFromFetch }) {

    const [isBook, setIsBook] = useState<boolean | undefined>()
    const createVisita = albumStore(state => state.addAlbum)
    const deleteVisita = albumStore(state => state.deleteAlbum)

    const saveLocal = "isFavorite" + album.id

    useEffect(() => {
        const getIsFavorite = localStorage.getItem(saveLocal);
        if (getIsFavorite) {
            setIsBook(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleBook = () => {
        if (isBook) {
            setIsBook(false)
            localStorage.removeItem(saveLocal)
            deleteVisita(album.id)
        } else {
            setIsBook(true)
            localStorage.setItem(saveLocal, saveLocal)
            createVisita(album)
        }
    }

    return (
        <div onClick={handleBook} className="cursor-pointer">
            {
                isBook
                    ?
                    (<IconBookLleno />)
                    :
                    (< IconBook />)
            }
        </div>
    )
}
