'use server'

import { InitialUser, User } from '@/interfaces/user'
import { patchUserService, updateUserService } from '@/services/userServices'
import { redirect } from 'next/navigation'

export async function setUserTags(
  user: InitialUser,
  tags: string[]
): Promise<InitialUser> {
  const newUser: InitialUser = {
    username: user.username,
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    password: user.password,
    tags: tags
  }

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
  const fields: User = {
    _id: user._id,
    username: formData.get('username') as string,
    password: (formData.get('password') as string) || user.password,
    email: (formData.get('email') as string) || user.email,
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    country: formData.get('country') as string,
    description: formData.get('description') as string,
    imageUrl: profileImg,
    isAdmin: user.isAdmin,
    tags: user.tags
  }

  try {
    const responseData = await updateUserService(fields)

    console.log(responseData)
    if (responseData) {
      redirect('/')
    }
    return responseData
  } catch (error) {
    console.error('Error al actualizar los tags:', error)
    throw error
  }
}
