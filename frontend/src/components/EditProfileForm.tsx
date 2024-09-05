"use client"

import { updateUserAction } from "@/actions/userActions"
import { useFormState } from "react-dom"
import { InitialUser, User } from "@/interfaces/user"
import { SubmitButton } from "./SubmitButton"
import { useState } from "react"
import Image from "next/image"
import { uploadSingleImage } from "@/services/uploadImageService"

const INITIAL_STATE = {
  data: null,
}

interface EditProfileProps {
  user: User | InitialUser
}

const EditProfileForm: React.FC<EditProfileProps> = ({ user }) => {
  const [profileImg, setProfileImg] = useState<string>('imageUrl' in user ? user.imageUrl : '')
  const updateUserComplete = updateUserAction.bind(null, profileImg, user)
  const [formState, formAction] = useFormState(
    updateUserComplete,
    INITIAL_STATE
  )

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const image = await uploadSingleImage(file)
      setProfileImg(image)
    }
  }

  const { email, username } = user

  return (
    <form action={formAction} className="flex flex-col gap-6 mt-16">

      <div className='flex flex-col text-center items-center gap-2 w-full relative'>
        <input
          type='file'
          name='imagenProfile'
          onChange={handleFileChange}
          className='block text-sm text-slate-500 w-32 h-32 rounded-full bg-amber-300 cursor-pointer content-center
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-light file:text-blue-800
      hover:file:bg-blue-darker
    '
        />
        <label htmlFor='imagenProfile'>
          {profileImg ? 'Cambiar Foto' : 'Subir foto'}
        </label>
        {profileImg && (
          <div className="absolute w-32 h-32">
            <Image
              width={128}
              height={128}
              className='w-32 h-32 rounded-full absolute'
              src={profileImg}
              alt='Profile Image uploaded'
            />
            <button
              onClick={() => setProfileImg('')}
              className="absolute top-0 right-0 bg-red-600 rounded-full w-6 h-6"
            >X</button>
          </div>
        )}

      </div>

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="firstname">Nombre</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="text"
          id="firstname"
          name="firstname"
          defaultValue={'firstname' in user ? user.firstname : ''}
          required
        />
      </div>

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="lastname">Apellido</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="text"
          id="lastname"
          name="lastname"
          defaultValue={'lastname' in user ? user.lastname : ''}
          required
        />
      </div>

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="country">País</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="text"
          id="country"
          name="country"
          defaultValue={'country' in user ? user.country : ''}
          required
        />
      </div>

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="description">Descripción</label>
        <input
          className="border-b h-20 border-gray-400 focus-visible:outline-none"
          id="description"
          name="description"
          defaultValue={'description' in user ? user.description : ''}
          required
        />
      </div>

      <div className="flex flex-col border-t border-gray-400 py-6 mt-6 mx-4 text-center gap-6">
        <h3>Información Importante</h3>
      </div>

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="username">Usuario</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="text"
          id="username"
          name="username"
          defaultValue={username}
          required
        />
      </div>

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="email">Email</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="email"
          id="email"
          name="email"
          defaultValue={email}
          required
        />
      </div>
      {formState?.errors?.email && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.email}</p>}

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="repeatEmail">Repetir Email</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="email"
          id="repeatEmail"
          name="repeatEmail"
        />
      </div>

      <div className="flex flex-col border-t border-gray-400 py-6 mt-6 mx-4 text-center gap-6">
        <h3>Cambiar Contraseña</h3>
      </div>

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="password">Contraseña Actual</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="password"
          id="password"
          name="password"
        />
      </div>
      {formState?.errors?.password && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.password}</p>}

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="newPassword">Nueva contraseña</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="password"
          id="newPassword"
          name="newPassword"
        />
      </div>
      {formState?.errors?.password && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.password}</p>}


      <div className="flex items-end px-4 justify-between">
        <label htmlFor="repeatPassword">Confirmar nueva contraseña</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="password"
          id="repeatPassword"
          name="repeatPassword"
        />
      </div>
      {formState?.errors?.repeatPassword && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.repeatPassword}</p>}


      <SubmitButton className="text-xl bg-slate-400 rounded h-12 mb-8 mx-4 text-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.15)]" loadingText="Cargando..." text="Editar" />
    </form>
  )
}

export default EditProfileForm