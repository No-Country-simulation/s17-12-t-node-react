import { getAlbumById } from "@/actions/albumActions";
import { BackArrow, SwiperImages } from "@/components";
import { AlbumFromFetch } from "@/interfaces/album";

export default async function PhotoPage({ params }: { params: { id: string } }) {

    const album: AlbumFromFetch = await getAlbumById(params.id)

    return (
        <div className="min-h-screen pt-20 ">
            <div className="absolute inset-0 bg-black opacity-70" />
            <BackArrow className="text-white relative z-50" />

            <div className="mt-10 relative z-50">
                <SwiperImages images={album.photos} />
            </div>

        </div>
    );
}