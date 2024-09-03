import { IconHome, IconImage, IconSearch, IconUser } from "@/components/icons";
import { FaListAlt } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-[#979797] sticky bottom-0 left-0 right-0 text-white rounded-t-2xl px-2 mt-16 flex justify-between sm:px-6">

            <div className="flex flex-col items-center justify-center">
                <IconHome />
                <p>Inicio</p>
            </div>

            <div className="grow flex justify-center ss:justify-evenly">
                <div className="flex flex-col items-center justify-center">
                    <IconSearch />
                    <p>Buscar</p>
                </div>

                <div className="flex flex-col items-center rounded-full border-4  size-[76px] justify-center relative -top-10 bg-[#979797] ss:size-24">
                    <IconImage size={25} />
                    <p className="text-[10px]">Crear album</p>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <FaListAlt />
                    <p>Wish list</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <IconUser />
                <p>Perfil</p>
            </div>

        </footer>
    )
}
