'use server'
import { z } from 'zod'

const schemaRegister = z
  .object({
    email: z.string({ message: 'Introduzca un email' }).email({
      message: 'La direccion de email es invalida. '
    }),
    password: z.string({ message: 'Introduzca una contraseña' }).min(6, {
      message: 'La contraseña es muy corta. '
    }),
    repeatPassword: z.string().min(6, {
      message: 'La contraseña es muy corta. '
    })
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Las contraseñas no coinciden. ',
    path: ['repeatPassword']
  })

import { RegisterUser } from '@/interfaces/user'
import { registerUserService } from '@/services/authServices'
import { redirect } from 'next/navigation'

export async function registerUserAction(prevState: any, formData: FormData) {
  const emailFromForm = formData.get('email') as string
  const passwordFromForm = formData.get('password') as string

  const validatedFields = schemaRegister.safeParse({
    email: emailFromForm,
    password: passwordFromForm,
    repeatPassword: formData.get('repeatPassword')
  })

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al Registrarse.'
    }
  }

  const body: RegisterUser = {
    email: emailFromForm,
    password: passwordFromForm,
    isAdmin: false
  }

  const responseData = await registerUserService(body)

  if (!responseData) {
    return {
      ...prevState,
      errors: {},
      registerError: null,
      message: 'Ops! Something went wrong. Please try again'
    }
  }

  if (responseData.message) {
    return {
      ...prevState,
      errors: {},
      registerError: responseData.message,
      message: 'Failed to Register'
    }
  }

  redirect('/preferences/' + responseData._id)
}
