import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="bg-white w-full h-screen text-black relative flex flex-col justify-center">
      <div className="p-4 absolute bg-gray-300 top-0 w-full">
        <Link href={'/feed'} className="absolute self-center">Regresar</Link>
        <h2 className="text-base text-center">Iniciar sesión</h2>
      </div>
      <LoginForm />
    </div>
  )
}