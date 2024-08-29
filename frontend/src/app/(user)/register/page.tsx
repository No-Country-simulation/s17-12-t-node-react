import RegisterForm from "@/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="bg-white w-full h-screen text-black relative flex flex-col justify-center">
      <h2 className="p-1 absolute top-0 text-base w-full bg-gray-300 text-center">Registrate</h2>
      <RegisterForm />
    </div>
  )
}