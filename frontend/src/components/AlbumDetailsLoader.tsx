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


  const commentsWithUsernames = await Promise.all(
    album.comments.map(async (comment) => {
      const user = await getUserById(comment.userId as string)
      return {
        ...comment,
        username: user?.username || "Usuario desconocido",
      }
    })
  )

  return (
    <AlbumDetails album={album} relatedAlbums={relatedAlbums} user={user} comments={commentsWithUsernames} />
  );
}
