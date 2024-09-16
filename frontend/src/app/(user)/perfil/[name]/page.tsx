
import sinAlbum from "/public/feed/user/ilustracionSinAlbum.tsx.png"
import { getAlbumByUser } from "@/actions/albumActions";
import { AlbumFromFetch } from "@/interfaces/album";
import CardAlbum from "@/components/Cards/CardAlbum";
import Image from "next/image";
import Link from "next/link";

//cambiar name por id en algun momento
export default async function PerfilPage({ params }: { params: { name: string } }) {

    const album: AlbumFromFetch[] = await getAlbumByUser(params.name)

    return (
        <article >
            <div>
                {
                    album.length > 0 ? album.map(photos => (
                        <div key={photos.id}>
                            <Link href={`/photo/${photos.id}`}>
                                <CardAlbum photos={photos.photos} />
                            </ Link >
                        </div>

                    )) : (
                        <div className="flex justify-center ">
                            <figure className="mt-10 relative">
                                <div className="bg-white/40 absolute h-[200px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full flex justify-center px-4 text-xl font-bold rounded-2xl shadow-sombra flex-col text-center text-TextPrimary gap-4">
                                    <p className="">Comparte tus experiencias de viaje</p>
                                    <p>¡Agrega Imágenes a tu perfil!</p>
                                </div>
                                <Image src={sinAlbum} alt="" />
                            </figure>
                        </div>
                    )
                }


            </div>
        </article>
    );
}
