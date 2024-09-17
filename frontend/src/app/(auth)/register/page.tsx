import { BackArrow } from "@/components"
import RegisterForm from "@/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="bg-white w-full h-screen text-black relative flex flex-col justify-center">
      <div className="flex items-center p-4 absolute bg-FondoPrimary text-white top-0 w-full">
        <BackArrow />
        <h2 className="text-xl text-center mx-auto">Registrarse</h2>
      </div>
      <RegisterForm />
    </div>
  )
}