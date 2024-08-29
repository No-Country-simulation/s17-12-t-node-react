import PreferencesForm from "@/components/PreferencesForm"
import Link from "next/link"

const BASE_URL = process.env.API_URL

export default async function PreferencesPage({ params }: { params: { _id: string } }) {
  const id = params._id
  const url = BASE_URL + '/user/' + id
  const data = await fetch(url)
  const profile = await data.json()
  console.log(profile)

  return (
    <div className="bg-white w-full min-h-screen text-black relative flex flex-col justify-center">
      <div className="p-1 absolute top-0 w-full bg-gray-300 text-center flex items-center justify-between px-6">
        <Link href={'/'}>Volver</Link>
        <h2 className="text-base">Tus intereses</h2>
        <p className="text-xs">{params._id}</p>
      </div>
      <PreferencesForm user={profile} />
    </div>
  )
}