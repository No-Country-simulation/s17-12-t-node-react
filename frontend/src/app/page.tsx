import { CardFeed, SwiperUsers } from "@/components"
import { AlbumFromFetch } from "@/interfaces/album"
import { User } from "@/interfaces/user"
import logo from "/public/logo.svg"
import { Footer } from "@/ui"
import { Suspense } from "react"
import Image from "next/image"

const BASE_URL = process.env.API_URL

export default async function Home() {
  const albumUrl = BASE_URL + '/album/search?q='
  const albumData = await fetch(albumUrl)
  const albumResults: AlbumFromFetch[] = await albumData.json()

  const userUrl = BASE_URL + '/user'
  const userData = await fetch(userUrl)
  const userResults: User[] = await userData.json()

  // const users = await getUser()
  return (
    // <main className="flex min-h-screen flex-col text-center justify-center gap-20 p-24">
    //   <h1>Bienvenidos a OhMyTrip!</h1>
    //   <Link href={'/register'} className="rounded bg-slate-500">Registro</Link>
    // </main>

    <>
      <div className="pb-8 px-2">
        <figure className="w-full border-b">
          <Image src={logo} alt="oh my trip logo" className="mx-auto h-8 w-48 my-6" />
        </figure>
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
      <Footer />
    </>
  )
}
