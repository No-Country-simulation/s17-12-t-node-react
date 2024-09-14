import { IconFlechaAtras } from "@/components/icons"
import RegisterForm from "@/components/RegisterForm"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="bg-white w-full h-screen text-black relative flex flex-col justify-center">
      <div className="p-4 absolute bg-gray-300 top-0 w-full">
        <Link href={'/feed'} className="absolute self-center"><IconFlechaAtras /></Link>
        <h2 className="text-base text-center">Registrarse</h2>
      </div>
      <RegisterForm />
    </div>
  )
}