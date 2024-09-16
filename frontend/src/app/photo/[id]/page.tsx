import { getAlbumById } from "@/actions/albumActions";
import { BackArrow, SwiperImages } from "@/components";
import ReadOnlyEditor from "@/components/LexicalEditor/ReadOnly";
import { AlbumFromFetch } from "@/interfaces/album";

export default async function PhotoPage({ params }: { params: { id: string } }) {

    const album: AlbumFromFetch = await getAlbumById(params.id)

    return (
        <div className="min-h-screen pt-8 bg-black/70">
            <div className="absolute inset-0" />
            <BackArrow className="text-white relative z-50" />

            <div className="mt-10 relative z-50">
                <SwiperImages images={album.photos} />
                <div className="text-white mt-4 line-clamp-3 px-4">
                    {
                        album.description.includes('"root":')
                            ? <ReadOnlyEditor feed={false} savedContent={album.description} />
                            : <p>{album.description}</p>
                    }
                </div>
            </div>
        </div>
    );
}