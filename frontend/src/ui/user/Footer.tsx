import { IconBook, IconHome, IconPlusCircle, IconSearch, IconUser } from "@/components/icons";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-FondoPrimary sticky bottom-0 left-0 right-0 text-white rounded-t-2xl py-2 px-2 mt-16 flex justify-between sm:px-6 z-10">

            <Link href={"/feed"} className="flex flex-col items-center justify-center">
                <IconHome />
                <p>Inicio</p>
            </Link>

            <div className="grow flex justify-center ss:justify-evenly">
                <Link href={'/search'} className="flex flex-col items-center justify-center">
                    <IconSearch />
                    <p>Buscar</p>
                </Link>

                <Link href={'/album/create'} className="flex flex-col items-center rounded-full  size-[70px] justify-center relative -top-10 bg-FondoPrimary ss:size-24">
                    <IconPlusCircle size={50} />
                    {/* <p className="text-[10px]">Crear album</p> */}
                </Link>

                <Link href={'/perfil/test'} className="flex flex-col items-center justify-center">
                    <IconBook />
                    <p>Wish list</p>
                </Link>
            </div>

            <Link href={"/perfil/william96"} className="flex flex-col items-center justify-center">
                <IconUser />
                <p>Perfil</p>
            </Link>

        </footer>
    )
}
