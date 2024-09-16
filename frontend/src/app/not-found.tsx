import Image from "next/image";
import notfound from "/public/notFound/404.png"
import Link from "next/link";
import { BackArrow } from "@/components";

export default function NotFoundPage() {
    return (
        <div className="h-screen flex flex-col py-10 px-10">

            <BackArrow />

            <div className="flex flex-col items-center pl-20 grow justify-center pb-20">
                <Image src={notfound} alt="404" />
                <p className="text-center mr-20 text-TextPrimary font-bold">ooh !! <br /> por aquí  no es:)
                </p>
                <Link href={"/"}>
                    <button className="text-TextPrimary bg-[#F3F3F3] px-8 py-2 rounded-2xl mt-6 drop-shadow-button">Volver al inicio</button>
                </Link>
            </div>
        </div>
    );
}