'use server'

import { InitialUser } from '@/interfaces/user'
import { patchUserService } from '@/services/userServices'
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
