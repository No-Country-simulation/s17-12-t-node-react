"use client"
import Image from "next/image"
import GoogleIcon from '/public/images/logos_google.svg'
import FacebookIcon from '/public/images/logos_facebook.svg'
import LinkedinIcon from '/public/images/logos_linkedin.svg'
import { registerUserAction } from "@/actions/authActions"
import { useFormState } from "react-dom"
import { SubmitButton } from "./SubmitButton"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const INITIAL_STATE = {
  data: null,
}

export default function RegisterForm() {
  const [formState, formAction] = useFormState(
    registerUserAction,
    INITIAL_STATE
  )

  const router = useRouter()

  useEffect(() => {
    if (formState.token) {
      localStorage.setItem("token", formState.token)
      localStorage.setItem("userId", formState.id)

      if (formState.id) {
        router.push(`/preferences/${formState.id}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.token])

  return (
    <form action={formAction} className="flex flex-col gap-6">

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="email">Email</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="email"
          id="email"
          name="email"
          required
        />

      </div>
      {formState?.errors?.email && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.email}</p>}

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="password">Contraseña</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      {formState?.errors?.password && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.password}</p>}

      <div className="flex items-end px-4 justify-between">
        <label htmlFor="repeatPassword">Confirmar contraseña</label>
        <input
          className="border-b border-gray-400 focus-visible:outline-none"
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          required
        />
      </div>
      {formState?.errors?.repeatPassword && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.errors?.repeatPassword}</p>}

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

      <SubmitButton className="text-xl bg-slate-400 rounded h-12 mx-4 text-white shadow-[0_4px_4px_0px_rgba(0,0,0,0.15)]" loadingText="Cargando..." text="Ingresá" />
      {formState?.registerError && <p className="-mt-4 mx-4 text-end text-red-500 text-xs">{formState?.message}: {formState?.registerError}</p>}
      {formState?.success && <p className="-mt-4 mx-4 text-end text-green-500 text-xs">{formState?.success}</p>}
    </form>
  )
}