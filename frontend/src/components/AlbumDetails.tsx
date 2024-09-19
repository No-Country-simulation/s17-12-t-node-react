'use client'
import { AlbumFromFetch, Comment } from "@/interfaces/album";
import { SwiperImages } from "./swiper/SwiperImages";
import { IconBook, IconCorazon } from "./icons";
import ReadOnlyEditor from "./LexicalEditor/ReadOnly";
import { Map, Marker } from 'react-map-gl'
import Image from "next/image";
import Link from "next/link";
import { User } from "@/interfaces/user";
import AvatarImage from '/public/image/avatarUser.png'
import { Suspense } from "react";
import { Comments } from "@/components/Comments";

const testdescription = '{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Sol en la Playa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":1,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"La llegada del ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"verano","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" trae consigo una de las actividades favoritas de todos: ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"ir a la playa","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":". Pero, ¿qué se necesita realmente para disfrutar de un día soleado en la arena? A continuación, exploraremos algunos aspectos esenciales.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"1. Preparación: El Clave del Éxito","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Antes de salir, es fundamental asegurarte de tener todo lo necesario. ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Aquí hay una lista","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":":","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Protector solar","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":": Nunca subestimes la importancia de cuidar tu piel. Aplica una capa generosa cada 2 horas.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Sombrero","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":": Un buen sombrero no solo te protegerá del sol, sino que también te mantendrá fresco.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Agua","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":": Mantente hidratado. Lleva una botella de agua y recuerda beber regularmente.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":2,"mode":"normal","style":"","text":"Consejo:","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Si planeas quedarte toda la jornada, ¡no olvides llevar snacks! Las frutas frescas son una excelente opción.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"2. Disfruta de las Actividades","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Una vez que estés en la playa, las opciones son infinitas.Puedes: ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Nadar en el mar","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Jugar a la pelota","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Leer un buen libro","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"¡Recuerda!","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" La playa no es solo para tomar el sol, sino también para disfrutar del entorno.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"3. Momentos para Recordar","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"No olvides capturar esos momentos especiales.Ya sea una selfie con amigos o una foto del atardecer, ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"los recuerdos son lo que nos queda","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":".","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"\\"La vida es mejor con un poco de sol y arena entre los dedos.\\"","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Conclusión: A Disfrutar!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Finalmente, recuerda que cada día en la playa es una nueva aventura.Así que, ¿estás listo para disfrutar del sol ? ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"¡Nos vemos en la playa!","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'

interface Props {
  album: AlbumFromFetch,
  relatedAlbums: AlbumFromFetch[],
  user: User | null,
  comments: Comment[]
}

export default function AlbumDetails({ album, relatedAlbums, user, comments }: Props) {
  const filteredRelated = relatedAlbums.filter((item) => item.id !== album.id)

  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <span className="text-2xl font-bold my-2" id="title">{album.title}</span>

        <div className="flex gap-2 flex-wrap">
          {album.tags.map((item) => (
            <span key={item} className="bg-amber-100 rounded-xl px-2 border">{item}</span>
          ))}
        </div>

        <div>
          <SwiperImages images={album.photos} />
        </div>
        <div className="flex flex-col gap-2 py-2 text-TextPrimary">
          <div className="flex gap-4 items-center">
            <IconCorazon className="text-red-500" />
            <span className="text-red-500">A 500 personas les gusto el viaje!</span>
          </div>
          <div className="flex gap-4 items-center">
            <IconBook className="text-green-500" />
            <span className="text-green-500">30 personas guardaron la experiencia!</span>
          </div>
        </div>

        <Link href={'/perfil/' + user?._id} className="flex w-max h-12 items-center gap-2 mb-2">
          <Image src={user ? user.imageUrl : AvatarImage} alt={user?.username + 'profile picture'} width={200} height={200} className="object-cover w-12 h-12 rounded-full" />
          <span className="font-medium">Publicacion por: {user?.username}</span>
        </Link>
      </div>

      {album.description.includes('"root":') ? (
        <ReadOnlyEditor feed={false} savedContent={album.description} />

      ) : (
        <ReadOnlyEditor feed={false} savedContent={testdescription} />
      )}

      <div className='relative w-full overflow-hidden rounded-xl'>
        <Map
          initialViewState={{
            longitude: album.location.longitude,
            latitude: album.location.latitude,
            zoom: 12,
          }}
          style={{ width: '100%', height: '437px', borderRadius: '32px' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        >
          <Marker longitude={album.location.longitude} latitude={album.location.latitude} />

        </Map>
      </div>

      {
        filteredRelated.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="font-bold text-2xl">Lugares Relacionados:</span>
            <div className="flex flex-wrap">
              {filteredRelated.map((item) => (
                <Link href={'/album/' + item.id} key={item.id} className="flex flex-col rounded-xl border p-1 gap-2 items-start">
                  {item.photos[0] && (
                    <Image src={item.photos[0].url} alt={item.photos[0].description} width={1000} height={1000} className="rounded-xl w-32 h-24" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      }

      <Suspense fallback={<div className="w-full h-28 bg-FondoPrimary rounded mb-2"></div>}>
        <Comments feed={false} comments={comments} albumId={album.id} />
      </Suspense>

      <div>
        <a href="#title">Volver arriba</a>
      </div>
    </div >
  )
}