'use server'

import { RegisterUser } from '@/interfaces/user'
import { registerUserService } from '@/services/authServices'
import { redirect } from 'next/navigation'

export async function registerUserAction(prevState: any, formData: FormData) {
  const emailFromForm = formData.get('email') as string
  const passwordFromForm = formData.get('password') as string
  const repeatPasswordFromForm = formData.get('repeatPassword') as string

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      repeatPassword: ''
    }

    if (!emailFromForm) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(emailFromForm)) {
      newErrors.email = 'El email no es válido'
    }

    if (!passwordFromForm) {
      newErrors.password = 'La contraseña es requerida'
    } else if (passwordFromForm.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres'
    }

    if (!repeatPasswordFromForm) {
      newErrors.repeatPassword = 'Campo requerido'
    } else if (passwordFromForm !== repeatPasswordFromForm) {
      newErrors.repeatPassword = 'Las contraseñas no coinciden'
    }

    return newErrors
  }

  const errors = validateForm()

  if (errors.email || errors.password || errors.repeatPassword) {
    return {
      ...prevState,
      errors
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
