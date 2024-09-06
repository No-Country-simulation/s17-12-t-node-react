import { BackArrow, CardFeed, SwiperUsers } from "@/components";
import { AlbumFromFetch } from "@/interfaces/album";
import { User } from "@/interfaces/user";

const BASE_URL = process.env.API_URL


export default async function FeedPage() {
    const albumUrl = BASE_URL + '/album/search?q='
    const albumData = await fetch(albumUrl)
    const albumResults: AlbumFromFetch[] = await albumData.json()

    const userUrl = BASE_URL + '/user'
    const userData = await fetch(userUrl)
    const userResults: User[] = await userData.json()

    return (
        <div className="py-8 px-2">
            <SwiperUsers users={userResults} />

            {/* Card  */}
            {albumResults.map((album) => (
                <CardFeed key={album.id} album={album} />
            ))}

        </div>
    );
}