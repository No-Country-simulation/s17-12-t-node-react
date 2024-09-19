import { BackArrow } from "@/components";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="bg-white w-full h-screen text-black relative flex flex-col justify-center">
      <div className="flex items-center p-4 absolute bg-FondoPrimary text-white top-0 w-full">
        <BackArrow />
        <h2 className="text-center mx-auto text-xl">Iniciar sesión</h2>
      </div>
      <LoginForm />
    </div>
  )
}