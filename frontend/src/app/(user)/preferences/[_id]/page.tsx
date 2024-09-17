import PreferencesForm from "@/components/PreferencesForm"
import { User } from "@/interfaces/user"
import Link from "next/link"

const BASE_URL = process.env.API_URL

export default async function PreferencesPage({ params }: { params: { _id: string } }) {
  const id = params._id
  const url = BASE_URL + '/user/' + id
  const data = await fetch(url)
  const profile: User = await data.json()

  return (
    <div className="bg-white w-full min-h-screen text-black relative flex flex-col">
      <div className="p-4 absolute top-0 w-full bg-FondoPrimary text-white text-center flex items-center justify-between px-6">
        <Link href={'/'}>Cancelar</Link>
        <h2 className="text-base">Tus intereses</h2>
        <p className="text-xs">{profile.username}</p>
      </div>
      <PreferencesForm user={profile} />
    </div>
  )
}