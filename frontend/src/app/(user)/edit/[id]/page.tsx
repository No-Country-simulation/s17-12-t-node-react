import EditProfileForm from "@/components/EditProfileForm"
import Link from "next/link"

const BASE_URL = process.env.API_URL

export default async function EditProfilePage({ params }: { params: { id: string } }) {
  const id = params.id
  const url = BASE_URL + '/user/' + id
  const data = await fetch(url)
  const profile = await data.json()

  return (
    <div className="bg-white w-full min-h-screen text-black relative flex flex-col justify-center">
      <div className="p-1 absolute top-0 w-full bg-gray-300 text-center text-base flex items-center justify-between px-6">
        <Link href={'/'}>Volver</Link>
        <h2 className="font-semibold">Editar Perfil</h2>
        <p>Guardar</p>
      </div>
      <EditProfileForm user={profile} />
    </div>
  )
}