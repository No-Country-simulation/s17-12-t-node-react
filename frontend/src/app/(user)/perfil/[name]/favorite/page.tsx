
"use client"

import { albumStore } from "@/store/aVisitar-store";

export default function FavoritePage() {

    const getAlbum = albumStore(state => state.getAlbum)

    return (
        <div>
            {JSON.stringify(getAlbum)}
        </div>
    );
}