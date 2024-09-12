import imageUser from "/public/feed/paisaje.jpg"
import { IconConfig } from "@/components/icons";
import { BackArrow } from "@/components";
import { User } from "@/interfaces/user";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/ui/perfil/NavBar";

interface Props {
    children: React.ReactNode
    params: { name: string }
}

const BASE_URL = process.env.API_URL

export default async function PerfilLayout({ children, params }: Props) {

    const id = params.name
    const url = BASE_URL + '/user/' + id
    const data = await fetch(url)
    const profile: User = await data.json()
    console.log(profile);

    // const user: User = await getUser()

    const profileImage = profile.imageUrl ? profile.imageUrl : imageUser
    const profileName = profile.username ? profile.username : id

    return (
        <div>
            <div className="flex justify-between bg-[#D9D9D9] pt-10 pb-2 px-2 text-[#979797]">
                <Link href={'/feed'}>
                    <BackArrow />
                </Link>
                <h1 className=" font-bold text-xl text-black">Mi Perfil</h1>
                <Link href={'/edit/' + profile._id}>
                    <IconConfig />
                </Link>
            </div>

            <div className="flex items-center ml-8 gap-3 my-6">
                <figure className="relative size-20 rounded-full overflow-hidden">
                    <Image src={profileImage} alt="Avatar" className="object-cover" fill />
                </figure>
                <h2 className="font-bold text-2xl ">{profileName}</h2>
            </div>

            <NavBar params={params.name} />

            <div>
                {children}
            </div>
        </div>
    );
}