import { getUser } from "@/actions/userActions";
import { CardFeed, SwiperUsers } from "@/components";
import { AlbumFromFetch } from "@/interfaces/album";
import { User } from "@/interfaces/user";
import { Suspense } from "react";

const BASE_URL = process.env.API_URL


export default async function FeedPage() {
    const albumUrl = BASE_URL + '/album/search?q='
    const albumData = await fetch(albumUrl)
    const albumResults: AlbumFromFetch[] = await albumData.json()

    const userUrl = BASE_URL + '/user'
    const userData = await fetch(userUrl)
    const userResults: User[] = await userData.json()

    // const users = await getUser()

    return (
        <div className="py-8 px-2 ">
            <Suspense fallback={<span>Cargando usuarios</span>}>
                <SwiperUsers users={userResults} />
            </Suspense>


            {/* Card  */}
            <Suspense fallback={<span>Cargando albums</span>}>
                {albumResults.map((album) => (
                    <CardFeed key={album.id} album={album} />
                ))}
            </Suspense>

        </div>
    );
}