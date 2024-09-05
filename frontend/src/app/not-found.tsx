import Image from "next/image";
import notfound from "/public/notFound/404.png"
import { IconFlechaAtras } from "@/components/icons";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="">
            <IconFlechaAtras className="ml-10 text-gray-500 my-10" />
            <div className="flex flex-col items-center pl-20">
                <Image src={notfound} alt="404" />
                <p className="text-center mr-20 text-TextPrimary font-bold">ooh !! <br /> por aquí  no es:)
                </p>
                <Link href={"/feed"}>
                    <button className="text-TextPrimary bg-[#F3F3F3] px-8 py-2 rounded-2xl mt-6 drop-shadow-button">Volver al inicio</button>
                </Link>
            </div>
        </div>
    );
}