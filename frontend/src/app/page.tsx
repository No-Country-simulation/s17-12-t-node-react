import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-center justify-center gap-20 p-24">
      <h1>Bienvenidos a OhMyTrip!</h1>
      <Link href={'/register'} className="rounded bg-slate-500">Registro</Link>
    </main>
  )
}
