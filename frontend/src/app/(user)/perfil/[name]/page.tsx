
import { getAlbumByUser } from "@/actions/albumActions";
import { AlbumFromFetch } from "@/interfaces/album";
import CardAlbum from "@/components/Cards/CardAlbum";
import { imagesAlbum } from "@/utils/ImagesUser";
import clsx from "clsx";
import Image from "next/image";

//cambiar name por id en algun momento
export default async function PerfilPage({ params }: { params: { name: string } }) {

    const album: AlbumFromFetch[] = await getAlbumByUser(params.name)

    console.log(params.name)

    return (
        <article >
            <div>
                {
                    album && album.map(photos => (
                        <div key={photos.id}>

                            <CardAlbum photos={photos.photos} />
                        </div>
                    ))
                }


            </div>
        </article>
    );
}
