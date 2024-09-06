"use client"
import { setUserTags } from "@/actions/userActions"
import { User } from "@/interfaces/user"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitButton } from "./SubmitButton"

const INITIAL_VALUES = [
  {
    name: 'Aventuras',
    imageUrl: 'https://res.cloudinary.com/db395v0wf/image/upload/v1724861994/im3yab6ey8gelfwylmhs.jpg'
  },
  {
    name: 'Fotografía',
    imageUrl: 'https://res.cloudinary.com/db395v0wf/image/upload/v1724861995/mmn6z8i7w9ultvrjealm.jpg'
  },
  {
    name: 'Playa',
    imageUrl: 'https://res.cloudinary.com/db395v0wf/image/upload/v1724861995/u0z3sav4xuwyavlsq5et.webp'
  },
  {
    name: 'Montaña',
    imageUrl: 'https://res.cloudinary.com/db395v0wf/image/upload/v1724861994/pifko9t9bfz87n8fqmbg.jpg'
  },
  {
    name: 'Travel & Blog',
    imageUrl: 'https://res.cloudinary.com/db395v0wf/image/upload/v1724861994/el2ognwrt1t1zxr4x0dx.webp'
  },
  {
    name: 'Senderismo',
    imageUrl: 'https://res.cloudinary.com/db395v0wf/image/upload/v1724861994/qtaeobvikve3wgr1q8zn.jpg'
  },
  {
    name: 'Rios',
    imageUrl: 'https://res.cloudinary.com/db395v0wf/image/upload/v1724861995/jiywzwyztqtuutv058vl.jpg'
  },
  {
    name: 'Parques',
    imageUrl: 'https://res.cloudinary.com/db395v0wf/image/upload/v1724861996/cqcy02bdkoms7lpmokag.jpg'
  }
]

interface UserProps {
  user: User
}

const PreferencesForm: React.FC<UserProps> = ({ user }) => {
  const [tags, setTags] = useState<Array<string>>([])
  const router = useRouter()
  const [error, setError] = useState<string>("")

  const handleSelect = (name: string) => {
    setTags((prevTags) =>
      prevTags.includes(name)
        ? prevTags.filter((tag) => tag !== name)
        : [...prevTags, name]
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const responseData = await setUserTags(user, tags)
      if (responseData && responseData.tags.length > 0) {
        router.push('/perfil/' + user._id)
      }
    } catch (error: any) {
      console.error('Error al actualizar los tags:', error)
      setError('Error al actualizar los tags: ' + error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-16 mx-6 flex flex-col gap-8">
      <p>Seleccioná los temas que más te interesan para que podamos guiarte a encontrar las mejores opciones</p>
      <div className="flex flex-wrap gap-10">
        {INITIAL_VALUES.map((item) => (
          <div
            key={item.name}
            onClick={() => handleSelect(item.name)}
            className={`relative w-[136px] h-[136px] rounded-xl overflow-hidden cursor-pointer ${tags.includes(item.name) ? 'ring-4 ring-amber-500' : ''
              }`}
          >
            <Image className="h-28" src={item.imageUrl} alt={`foto ${item.name}`} width={400} height={400} />
            <p className="bg-slate-400 w-full text-center rounded-b-xl">{item.name}</p>
            {tags.includes(item.name) && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <span className="text-amber-500 text-6xl">✔</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <SubmitButton className="text-xl bg-slate-400 rounded h-12 mb-8 text-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.15)]" loadingText="Cargando..." text="Ingresá" />
      {error && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{error}</p>}
    </form>
  )
}
export default PreferencesForm