import { getAlbumsByTag } from "@/actions/albumActions";
import { getUserById } from "@/actions/userActions";
import AlbumDetails from "@/components/AlbumDetails";
import { AlbumFromFetch } from "@/interfaces/album";
import { User } from "@/interfaces/user";

const BASE_URL = process.env.API_URL;

export default async function AlbumDetailsLoader({ id }: { id: string }) {
  const url = BASE_URL + '/album/' + id;
  const data = await fetch(url);
  const album: AlbumFromFetch = await data.json();

  const relatedAlbums = await getAlbumsByTag(album.tags[0]);
  const user: User | null = await getUserById(album.userId);

  return (
    <AlbumDetails album={album} relatedAlbums={relatedAlbums} user={user} />
  );
}
