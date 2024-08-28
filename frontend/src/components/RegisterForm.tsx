"use client"
import Image from "next/image"
import { useState } from "react"
import GoogleIcon from '/public/images/logos_google.svg'
import FacebookIcon from '/public/images/logos_facebook.svg'
import LinkedinIcon from '/public/images/logos_linkedin.svg'

interface userValues {
  username: string,
  email: string,
  password: string,
  repeatPassword: string
}

export default function RegisterForm() {
  const [values, setValues] = useState<userValues>({
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  })
  const [formErrors, setFormErrors] = useState<userValues>({
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  })

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    }

    if (!values.username) {
      newErrors.username = 'El nombre de usuario es requerido'
    }

    if (!values.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!values.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (values.password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres'
    }

    if (!values.repeatPassword) {
      newErrors.repeatPassword = 'Debes confirmar la contraseña'
    } else if (values.password !== values.repeatPassword) {
      newErrors.repeatPassword = 'Las contraseñas no coinciden'
    }

    setFormErrors(newErrors)

    return Object.values(newErrors).every((error) => error === '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      //Aca se hace un POST al endpoint de user con el body
      const body = {
        email: values.email,
        username: values.username,
        password: values.password
      }
      console.log(body)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex items-end px-4 justify-between">
        <label htmlFor="username">Usuario</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleChange}
          required
        />
        {formErrors.username && <p className="-mt-4 mx-4 text-end text-red-500 text-sm">{formErrors.username}</p>}
      </div>

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="email">Email</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />

      </div>
      {formErrors.email && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formErrors.email}</p>}

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="password">Contraseña</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </div>
      {formErrors.password && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formErrors.password}</p>}

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="repeatPassword">Confirmar contraseña</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={values.repeatPassword}
          onChange={handleChange}
          required
        />
      </div>
      {formErrors.repeatPassword && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formErrors.repeatPassword}</p>}

      <div className="flex flex-col border-t border-gray-400 py-6 mt-6 mx-4 text-center gap-6">
        <h3>registrate con</h3>
        <div className="flex justify-evenly">
          <button className="p-2 rounded-xl shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
            <Image alt="logo google" src={GoogleIcon} />
          </button>
          <button className="p-2 rounded-xl shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
            <Image alt="logo google" src={FacebookIcon} />
          </button>
          <button className="p-2 rounded-xl shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
            <Image alt="logo google" src={LinkedinIcon} />
          </button>
        </div>
      </div>

      <button type="submit" className="text-xl bg-slate-400 rounded h-12 mx-4 text-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.15)]">Ingresá</button>
    </form>
  )
}