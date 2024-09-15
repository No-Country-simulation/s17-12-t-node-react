import { AlbumFromFetch } from "@/interfaces/album";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface Favorites {
    getAlbum: AlbumFromFetch[]
    addAlbum: (data: AlbumFromFetch) => void
    deleteAlbum: (data: string) => void
}

export const albumStore = create<Favorites>()(
    persist(
        (set, get) => ({
            getAlbum: [],
            addAlbum: (data) => set((state) => ({ getAlbum: [...state.getAlbum, data] })),
            deleteAlbum: (data) => set(state => ({ getAlbum: state.getAlbum.filter(album => album.id !== data) }))
        }),
        {
            name: "favorites"
        }
    )
)

