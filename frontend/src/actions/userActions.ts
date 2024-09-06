'use server'
import { z } from 'zod'
import { InitialUser, User, UserWithoutId } from '@/interfaces/user'
import { patchUserService, updateUserService } from '@/services/userServices'
import { redirect } from 'next/navigation'

const schemaUser = z
  .object({
    email: z.string({ message: 'Introduzca un email' }).email({
      message: 'La direccion de email es invalida. ',
    }),
    password: z.string({ message: 'Introduzca una contraseña' }).min(6, {
      message: 'La contraseña es muy corta. ',
    }),
    newPassword: z.string({ message: 'Introduzca una contraseña' }).min(6, {
      message: 'La contraseña es muy corta. ',
    }),
    repeatPassword: z.string().min(6, {
      message: 'La contraseña es muy corta. ',
    }),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: 'Las contraseñas no coinciden. ',
    path: ['repeatPassword'],
  })

export async function setUserTags(
  user: User,
  tags: string[]
): Promise<InitialUser> {
  const newUser: UserWithoutId = {
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    password: user.password,
    tags: tags,
    firstname: '',
    lastname: '',
    country: '',
    description: '',
    imageUrl: '',
  }

  console.log(newUser)

  try {
    const responseData: InitialUser = await patchUserService(user._id, newUser)

    return responseData
  } catch (error) {
    console.error('Error al actualizar los tags:', error)
    throw error
  }
}

export async function updateUserAction(
  profileImg: string,
  user: InitialUser,
  prevState: any,
  formData: FormData
) {
  const fields: UserWithoutId = {
    username: formData.get('username') as string,
    password: (formData.get('password') as string) || user.password,
    email: (formData.get('email') as string) || user.email,
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    country: formData.get('country') as string,
    description: formData.get('description') as string,
    imageUrl: profileImg,
    isAdmin: user.isAdmin,
    tags: user.tags,
  }

  /*   const validatedFields = schemaUser.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    newPassword: formData.get('newPassword'),
    repeatPassword: formData.get('repeatPassword'),
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message:
        'Los campos obligatorios no pueden estar vacios. Error al Editar Perfil.',
    }
  } */

  try {
    const responseData = await updateUserService(fields, user._id)

    if (responseData) {
      console.log('Datos actualizados:', responseData)

      redirect('/perfil/' + user._id)
    }
    return responseData
  } catch (error) {
    console.error('Error al actualizar los tags:', error)
    throw error
  }
}
