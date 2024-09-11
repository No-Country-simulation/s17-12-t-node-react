import { getAlbumsByTag } from "@/actions/albumActions";
import { getUserById } from "@/actions/userActions";
import { BackArrow } from "@/components";
import AlbumDetails from "@/components/AlbumDetails";
import { AlbumFromFetch } from "@/interfaces/album";
import { User } from "@/interfaces/user";
import Link from "next/link";

const BASE_URL = process.env.API_URL

export default async function AlbumDetailsPage({ params }: { params: { id: string } }) {
  const id = params.id
  const url = BASE_URL + '/album/' + id
  const data = await fetch(url)
  const album: AlbumFromFetch = await data.json()

  const relatedAlbums = await getAlbumsByTag(album.tags[0])
  const user: User | null = await getUserById(album.userId)

  return (
    <div>
      <div className="mx-4 mt-2 ">
        <BackArrow />
      </div>
      <AlbumDetails album={album} relatedAlbums={relatedAlbums} user={user} />
    </div>
  )
}