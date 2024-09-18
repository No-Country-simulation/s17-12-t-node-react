import { BackArrow } from "@/components"
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
      <div className="p-4 absolute top-0 w-full bg-FondoPrimary text-white text-center text-base flex items-center justify-between pe-6">
        <BackArrow />
        <h2 className="font-semibold mx-auto">Editar Perfil</h2>
      </div>
      <EditProfileForm user={profile} />
    </div>
  )
}